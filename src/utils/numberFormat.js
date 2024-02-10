export default function numberFormat(n) {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e5) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e5 && n < 1e6) return +(n / 1e3).toFixed(0) + "K";

  if (n >= 1e6 && n < 1e8) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e8 && n < 1e9) return +(n / 1e6).toFixed(0) + "M";

  if (n >= 1e9 && n < 1e11) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e11 && n < 1e12) return +(n / 1e9).toFixed(0) + "B";

  if (n >= 1e12 && n < 1e14) return +(n / 1e12).toFixed(1) + "T";
  return +(n / 1e12).toFixed(0) + "T";
}
