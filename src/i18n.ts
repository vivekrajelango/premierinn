import { getRequestConfig } from 'next-intl/server';

// Export locales and defaultLocale
export const locales = ['en', 'de'];
export const defaultLocale = 'en';

// This is the correct way to configure next-intl in v3.x
export default getRequestConfig(async ({ locale }:any) => {
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) {
    locale = defaultLocale;
  }
  
  // Include the locale in the return object
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

// Helper function for getting locale from pathname
export function getLocale(pathname: string | undefined) {
  if (!pathname) return defaultLocale;
  const segments = pathname.split('/');
  const localeCandidate = segments[1];
  return locales.includes(localeCandidate) ? localeCandidate : defaultLocale;
}