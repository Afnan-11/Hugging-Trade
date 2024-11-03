"use client";

import {usePathname} from "next/navigation";
import {useState} from "react";
import {routing} from "@/i18n/routing";
import {ChevronDown, ChevronUp} from "lucide-react";

const LanguageSwitcher = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const handleDropdownToggle = () => {
    setOpenDropdown(openDropdown === "language" ? null : "language");
  };

  const handleLocaleChange = (locale: string) => {
    if (pathname) {
      const newPath = `/${locale}${pathname.substring(3)}`;
      window.location.href = newPath;
    }
  };

  // Extract the current locale from the pathname
  const currentLocale = pathname.split("/")[1] as (typeof routing.locales)[number];
  const selectedLocale = routing.locales.includes(currentLocale) ? currentLocale : routing.defaultLocale;

  // Language options with display names and abbreviations
  const languageOptions = {
    en: {name: "English", abbr: "Eng"},
    pt: {name: "Português", abbr: "Por"},
    fr: {name: "Français", abbr: "Fra"},
    de: {name: "Deutsch", abbr: "Deu"},
    es: {name: "Español", abbr: "Esp"},
    it: {name: "Italiano", abbr: "Ita"},
  };

  return (
    <div className="">
      <button
        onClick={handleDropdownToggle}
        className="flex cursor-pointer items-center rounded-xl px-4 py-2 text-black hover:bg-blue-50"
      >
        {/* Show only the abbreviation when closed, and full name with abbreviation when open */}
        {openDropdown === "language"
          ? `${languageOptions[selectedLocale]?.name} ${languageOptions[selectedLocale]?.abbr}`
          : languageOptions[selectedLocale]?.abbr}

        {openDropdown === "language" ? (
          <ChevronUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4" />
        )}
      </button>

      {openDropdown === "language" && (
        <div
          className="absolute mt-2 w-56 rounded-xl bg-white shadow-lg"
          role="menu"
        >
          <div
            className="w-[205px] py-1"
            role="none"
          >
            {routing.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={`m-2 flex w-full items-center justify-start gap-2 rounded-xl px-4 py-2 text-[16px] font-light ${locale === selectedLocale ? "bg-blue-50 font-bold text-black" : "text-black hover:bg-blue-50"}`}
                role="menuitem"
              >
                <span>{languageOptions[locale]?.name}</span>
                <span className={`${locale === selectedLocale ? "text-black" : "text-gray-400"}`}>
                  {languageOptions[locale]?.abbr}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
