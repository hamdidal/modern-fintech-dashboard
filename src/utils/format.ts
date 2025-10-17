const CURRENCY_SYMBOL_MAP: Record<string, string> = {
  $: "USD",
  "€": "EUR",
  "£": "GBP",
  "¥": "JPY",
  "₺": "TRY",
  "₹": "INR",
  "₽": "RUB",
  元: "CNY",
  CHF: "CHF",
  CAD: "CAD",
  AUD: "AUD",
};

const normalizeCurrency = (currency: string): string => {
  if (/^[A-Z]{3}$/.test(currency)) {
    return currency;
  }

  return CURRENCY_SYMBOL_MAP[currency] || "USD";
};

export const formatCurrency = (
  value: number,
  currency = "USD",
  locale = navigator.language
): string => {
  try {
    const normalizedCurrency = normalizeCurrency(currency);
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: normalizedCurrency,
    }).format(value);
  } catch {
    console.warn(
      `Invalid currency code: ${currency}, falling back to default formatting`
    );
    return `${currency} ${value.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

export const formatDate = (
  value: string | number | Date,
  locale = navigator.language
): string => {
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return typeof value === "string" ? value : "Invalid Date";
    }
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  } catch {
    console.warn(`Error formatting date: ${value}`);
    return typeof value === "string" ? value : "Invalid Date";
  }
};

export const formatDateShort = (
  value: string | number | Date,
  locale = navigator.language
): string => {
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return typeof value === "string" ? value : "Invalid Date";
    }
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "2-digit",
    }).format(date);
  } catch {
    console.warn(`Error formatting date: ${value}`);
    return typeof value === "string" ? value : "Invalid Date";
  }
};

export const formatDateLong = (
  value: string | number | Date,
  locale = navigator.language
): string => {
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return typeof value === "string" ? value : "Invalid Date";
    }
    return new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    console.warn(`Error formatting date: ${value}`);
    return typeof value === "string" ? value : "Invalid Date";
  }
};

export const formatDateTime = (
  value: string | number | Date,
  locale = navigator.language
): string => {
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return typeof value === "string" ? value : "Invalid Date";
    }
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    console.warn(`Error formatting date: ${value}`);
    return typeof value === "string" ? value : "Invalid Date";
  }
};

export const formatRelativeDate = (
  value: string | number | Date,
  locale = navigator.language
): string => {
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return typeof value === "string" ? value : "Invalid Date";
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if ("RelativeTimeFormat" in Intl) {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

      if (diffInDays === 0) {
        return rtf.format(0, "day");
      } else if (diffInDays === 1) {
        return rtf.format(-1, "day");
      } else if (diffInDays < 7) {
        return rtf.format(-diffInDays, "day");
      } else if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return rtf.format(-weeks, "week");
      } else if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return rtf.format(-months, "month");
      } else {
        const years = Math.floor(diffInDays / 365);
        return rtf.format(-years, "year");
      }
    }

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    console.warn(`Error formatting relative date: ${value}`);
    return typeof value === "string" ? value : "Invalid Date";
  }
};

export const generateSecurePassword = (length: number = 16): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = '!@#$%^&*(),.?":{}|<>';

  let password = "";
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  const allChars = uppercase + lowercase + numbers + specialChars;
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
