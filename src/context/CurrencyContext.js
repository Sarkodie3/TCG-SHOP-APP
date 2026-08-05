"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Fixed exchange rates from USD (base currency)
// These are approximate rates - update periodically
const EXCHANGE_RATES = {
  USD: 1,
  AUD: 1.53,
  EUR: 0.92,
  CAD: 1.36,
  CNY: 7.24,
  CZK: 23.10,
  DKK: 6.88,
  HKD: 7.78,
  HUF: 362.0,
  INR: 83.95,
  IDR: 16250,
  ILS: 3.70,
  JPY: 157.50,
  MOP: 8.06,
  MYR: 4.68,
  MXN: 17.15,
  NPR: 133.5,
  NZD: 1.65,
  NOK: 10.55,
  PHP: 57.45,
  PLN: 4.01,
  QAR: 3.64,
  SGD: 1.34,
  KRW: 1370,
  SEK: 10.60,
  CHF: 0.90,
  TWD: 32.15,
  THB: 35.10,
  AED: 3.67,
  GBP: 0.79,
  VND: 25450,
};

const CURRENCY_SYMBOLS = {
  USD: "$",
  AUD: "$",
  EUR: "€",
  CAD: "$",
  CNY: "¥",
  CZK: "Kč",
  DKK: "kr.",
  HKD: "$",
  HUF: "Ft",
  INR: "₹",
  IDR: "Rp",
  ILS: "₪",
  JPY: "¥",
  MOP: "P",
  MYR: "RM",
  MXN: "$",
  NPR: "Rs.",
  NZD: "$",
  NOK: "kr",
  PHP: "₱",
  PLN: "zł",
  QAR: "ر.ق",
  SGD: "$",
  KRW: "₩",
  SEK: "kr",
  CHF: "CHF",
  TWD: "$",
  THB: "฿",
  AED: "د.إ",
  GBP: "£",
  VND: "₫",
};

const CurrencyContext = createContext(null);

export default function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  // Load persisted currency from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kagami_currency");
    if (saved && EXCHANGE_RATES[saved]) {
      setCurrency(saved);
    }
  }, []);

  const changeCurrency = useCallback((code) => {
    if (EXCHANGE_RATES[code]) {
      setCurrency(code);
      localStorage.setItem("kagami_currency", code);
    }
  }, []);

  /**
   * Convert a USD price to the currently selected currency
   */
  const convert = useCallback(
    (usdPrice) => {
      const rate = EXCHANGE_RATES[currency] || 1;
      return usdPrice * rate;
    },
    [currency]
  );

  /**
   * Format a USD price as a string in the selected currency
   */
  const formatPrice = useCallback(
    (usdPrice) => {
      const converted = convert(usdPrice);
      const symbol = CURRENCY_SYMBOLS[currency] || currency;

      // For currencies with very large values (like VND, IDR, HUF, KRW), show no decimals
      const noDecimals = ["VND", "IDR", "HUF", "KRW", "INR", "NPR", "CZK", "PHP", "TWD", "THB", "DKK", "NOK", "SEK", "JPY"].includes(currency);

      if (noDecimals) {
        return `${symbol}${Math.round(converted).toLocaleString()}`;
      }
      return `${symbol}${converted.toFixed(2)}`;
    },
    [currency, convert]
  );

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, convert, formatPrice, symbol: CURRENCY_SYMBOLS[currency] || currency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
