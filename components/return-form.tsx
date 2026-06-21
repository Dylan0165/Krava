"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

type Status = "idle" | "error" | "done";

/**
 * Model withdrawal / return request form (NL/EU herroepingsrecht).
 * No backend yet — wire the submit to your order system / ESP later. A reason
 * is intentionally optional: under EU law a consumer does not have to give one.
 */
export function ReturnForm() {
  const [order, setOrder] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!order.trim() || !emailValid) {
      setStatus("error");
      return;
    }
    // Placeholder: register the withdrawal/return request server-side here.
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex items-start gap-4 border border-seam bg-carbon p-6">
        <CheckCircle size={24} weight="light" className="mt-0.5 shrink-0 text-sand" />
        <div>
          <p className="font-display text-[13px] uppercase tracking-wider text-bone">
            Return registered
          </p>
          <p className="mt-2 max-w-[48ch] text-[13px] leading-relaxed text-ash">
            We&apos;ve logged your withdrawal request for order{" "}
            <span className="text-bone">{order}</span>. A confirmation and a
            prepaid return label are on their way to{" "}
            <span className="text-bone">{email}</span>. Your refund is processed
            within 14 days of us receiving the item.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="order"
          label="Order number"
          required
          value={order}
          onChange={(v) => {
            setOrder(v);
            if (status === "error") setStatus("idle");
          }}
          placeholder="KRV-10421"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@email.com"
        />
      </div>

      <Field
        id="name"
        label="Full name"
        value={name}
        onChange={setName}
        placeholder="Your name"
      />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="reason"
          className="eyebrow text-ash"
        >
          Reason{" "}
          <span className="lowercase tracking-normal text-ash/70">
            (optional — you don&apos;t have to give one)
          </span>
        </label>
        <textarea
          id="reason"
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Tell us why you're returning, if you'd like."
          className="w-full resize-none border border-seam bg-carbon px-4 py-3 text-[13px] text-bone placeholder:text-ash/60 focus:border-sand focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="border border-seam bg-carbon px-3 py-2 text-[12px] text-sand-soft">
          Please enter your order number and a valid email address.
        </p>
      )}

      <button type="submit" className="btn-solid w-full sm:w-auto">
        Start return <ArrowRight size={15} weight="bold" />
      </button>

      <p className="text-[11px] leading-relaxed text-ash">
        Submitting this form counts as exercising your statutory right of
        withdrawal. You can also email{" "}
        <a
          href="mailto:returns@krava.co"
          className="text-sand underline-offset-4 hover:underline"
        >
          returns@krava.co
        </a>{" "}
        or use the model withdrawal form below.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow text-ash">
        {label}
        {required && <span className="text-sand"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={type === "email" ? "email" : undefined}
        autoComplete={type === "email" ? "email" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full border border-seam bg-carbon px-4 text-[13px] text-bone placeholder:text-ash/60 focus:border-sand focus:outline-none"
      />
    </div>
  );
}
