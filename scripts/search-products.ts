/**
 * Searches CJ Dropshipping for sourcing candidates matching the KRAVA range.
 *
 * Run with:  npm run cj:search
 * (loads .env.local via dotenv; needs CJ_API_EMAIL and CJ_API_KEY set)
 */

import dotenv from "dotenv";
import { getAccessToken, searchProducts, type CjProduct } from "../lib/cj";

// Belt-and-suspenders: ensure .env.local is loaded even if the -r dotenv/config
// preload path isn't used. dotenv won't override already-set vars.
dotenv.config({ path: ".env.local" });

const KEYWORDS = [
  "sport cooling towel microfiber",
  "roll top waterproof dry bag outdoor",
  "portable bluetooth speaker waterproof outdoor",
  "UV protection arm sleeves sun",
  "running hydration vest backpack water bladder",
];

const TOP_N = 5;

function field(p: CjProduct, ...keys: string[]): string {
  for (const k of keys) {
    const v = p[k];
    if (v !== undefined && v !== null && v !== "") return String(v);
  }
  return "—";
}

// Best-effort numeric inventory across the keys CJ may use, for sorting DESC.
// NOTE: product/list has no true stock field; this falls back to `listedNum`
// (the only numeric stock proxy CJ returns on this endpoint).
function inventoryNum(p: CjProduct): number {
  const raw = field(p, "inventory", "listedNum", "sellQuantity");
  const n = Number(raw);
  return Number.isFinite(n) ? n : -1;
}

// CJ enforces QPS limit of 1 request/second across endpoints.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function run() {
  if (!process.env.CJ_API_EMAIL || !process.env.CJ_API_KEY) {
    console.error(
      "\n  ✗ CJ_API_EMAIL / CJ_API_KEY are not set.\n" +
        "    Create .env.local with your CJ API credentials, then re-run.\n" +
        "    (CJ dashboard → Authorization → API)\n",
    );
    process.exitCode = 1;
    return;
  }

  // Authenticate ONCE up front. If the key is wrong, there is no point
  // looping over every keyword (and re-hitting auth trips CJ's rate limits).
  try {
    await getAccessToken();
    console.log("  ✓ Authenticated with CJ.");
  } catch (err) {
    console.error(
      `\n  ✗ ${err instanceof Error ? err.message : String(err)}\n` +
        "    Your CJ login is not valid. Check that:\n" +
        "      • CJ_API_EMAIL matches the account that owns the key\n" +
        "      • CJ_API_KEY is the current key (regenerate in CJ → Authorization → API)\n" +
        "      • a freshly generated key has had a minute to activate\n",
    );
    process.exitCode = 1;
    return;
  }

  for (let i = 0; i < KEYWORDS.length; i++) {
    const keyword = KEYWORDS[i];
    if (i > 0) await sleep(1100); // stay under the 1 req/sec QPS limit
    console.log(`\n${"=".repeat(64)}`);
    console.log(`SEARCH: "${keyword}"`);
    console.log("=".repeat(64));

    try {
      const data = await searchProducts(keyword);
      const all = data.list ?? [];

      if (all.length === 0) {
        console.log("  (no results)");
        continue;
      }

      // Sort by inventory DESC (in-stock first), then take the top N.
      const list = [...all]
        .sort((a, b) => inventoryNum(b) - inventoryNum(a))
        .slice(0, TOP_N);

      console.log(
        `  Top ${list.length} of ${data.total} result(s), by inventory:\n`,
      );
      list.forEach((p, i) => {
        // Full English name, untruncated, so relevance is easy to judge.
        console.log(`  ${String(i + 1).padStart(2, " ")}. ${field(p, "productNameEn")}`);
        console.log(`      pid        : ${field(p, "pid")}`);
        console.log(`      sellPrice  : $${field(p, "sellPrice")}`);
        console.log(`      inventory  : ${field(p, "inventory", "listedNum", "sellQuantity")}`);
        console.log(`      warehouse  : ${field(p, "warehouseCountryCode", "shippingCountryCodes")}`);
      });
    } catch (err) {
      console.error(
        `  ✗ ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  console.log("");
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exitCode = 1;
});
