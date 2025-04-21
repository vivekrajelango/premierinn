'use client';

import { usePathname, useRouter } from 'next/navigation';
import { getLocale } from '@/i18n';

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = getLocale(pathname);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split('/');
    if (segments[1] === currentLocale) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/'));
  };

  return (
    <select
      value={currentLocale}
      onChange={handleLanguageChange}
      className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F2D7F] focus:border-transparent"
    >
      <option value="en">English</option>
      <option value="de">Deutsch</option>
    </select>
  );
}