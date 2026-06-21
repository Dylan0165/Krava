/**
 * CJ Dropshipping API client.
 *
 * Reads CJ_API_EMAIL and CJ_API_KEY from the environment (.env.local).
 * Docs: https://developers.cjdropshipping.com/
 *
 * Notes:
 *  - The access token is cached in-module. CJ rate-limits getAccessToken
 *    aggressively (roughly 1 call per 5 minutes), so we reuse the token until
 *    it is close to expiry.
 *  - Every CJ response is shaped { code, result, message, data, requestId }.
 *    code === 200 / result === true means success.
 */

const BASE = "https://developers.cjdropshipping.com/api2.0/v1";

export type CjResponse<T> = {
  code: number;
  result: boolean;
  message: string;
  data: T;
  requestId?: string;
};

export type CjAccessToken = {
  accessToken: string;
  accessTokenExpiryDate: string;
  refreshToken: string;
  refreshTokenExpiryDate: string;
};

export type CjProduct = {
  pid: string;
  productNameEn: string;
  sellPrice: string;
  // CJ returns inventory/stock under a few different keys depending on endpoint
  inventory?: number | string;
  warehouseCountryCode?: string;
  [key: string]: unknown;
};

export type CjProductList = {
  pageNum: number;
  pageSize: number;
  total: number;
  list: CjProduct[];
};

export type CjFreightOption = {
  logisticName?: string;
  logisticPrice?: number | string;
  logisticAging?: string;
  [key: string]: unknown;
};

function getCredentials(): { email: string; apiKey: string } {
  const email = process.env.CJ_API_EMAIL;
  const apiKey = process.env.CJ_API_KEY;
  if (!email || !apiKey) {
    throw new Error(
      "Missing CJ credentials. Set CJ_API_EMAIL and CJ_API_KEY in .env.local.",
    );
  }
  return { email, apiKey };
}

// In-module token cache.
let cachedToken: string | null = null;
let cachedTokenExpiry = 0; // epoch ms

/**
 * Authenticate with CJ and return an access token.
 * The token is cached until ~1 minute before expiry to respect rate limits.
 */
export async function getAccessToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedToken && Date.now() < cachedTokenExpiry - 60_000) {
    return cachedToken;
  }

  const { email, apiKey } = getCredentials();

  const res = await fetch(`${BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, apiKey }),
  });

  const json = (await res.json()) as CjResponse<CjAccessToken>;

  if (!res.ok || json.result !== true || !json.data?.accessToken) {
    throw new Error(
      `CJ auth failed (HTTP ${res.status}, code ${json.code}): ${
        json.message ?? "unknown error"
      }`,
    );
  }

  cachedToken = json.data.accessToken;
  const expiry = Date.parse(json.data.accessTokenExpiryDate);
  // Fall back to a conservative 15-minute lifetime if the date is unparseable.
  cachedTokenExpiry = Number.isNaN(expiry) ? Date.now() + 15 * 60_000 : expiry;

  return cachedToken;
}

/**
 * Search CJ's catalogue by English product name (first 20 results, all warehouses).
 */
export async function searchProducts(
  keyword: string,
): Promise<CjProductList> {
  const token = await getAccessToken();

  const params = new URLSearchParams({
    pageNum: "1",
    pageSize: "20",
    productNameEn: keyword,
  });

  const res = await fetch(`${BASE}/product/list?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
    },
  });

  const json = (await res.json()) as CjResponse<CjProductList>;

  if (!res.ok || json.result !== true) {
    throw new Error(
      `CJ product search failed for "${keyword}" (HTTP ${res.status}, code ${json.code}): ${
        json.message ?? "unknown error"
      }`,
    );
  }

  return json.data;
}

/**
 * Calculate domestic NL freight options for a given variant id (vid).
 */
export async function calculateFreight(
  vid: string,
): Promise<CjFreightOption[]> {
  const token = await getAccessToken();

  const res = await fetch(`${BASE}/logistic/freightCalculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
    },
    body: JSON.stringify({
      startCountryCode: "NL",
      endCountryCode: "NL",
      vid,
      quantity: 1,
    }),
  });

  const json = (await res.json()) as CjResponse<CjFreightOption[]>;

  if (!res.ok || json.result !== true) {
    throw new Error(
      `CJ freight calculation failed for vid "${vid}" (HTTP ${res.status}, code ${json.code}): ${
        json.message ?? "unknown error"
      }`,
    );
  }

  return json.data;
}
