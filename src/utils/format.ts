import i18n from 'i18next'

const getLocaleFromLanguage = (): string => {
  const currentLanguage = i18n.language || 'en';
  
  const localeMap: Record<string, string> = {
    'tr': 'tr-TR',
    'en': 'en-US',
  };
  
  return localeMap[currentLanguage] || 'en-US';
};

export const formatDate = (
  value: string | number | Date,
  locale?: string
): string => {
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return typeof value === "string" ? value : "Invalid Date";
    }
    
    const dateLocale = locale || getLocaleFromLanguage();
    
    return new Intl.DateTimeFormat(dateLocale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  } catch {
    console.warn(`Error formatting date: ${value}`);
    return typeof value === "string" ? value : "Invalid Date";
  }
};
