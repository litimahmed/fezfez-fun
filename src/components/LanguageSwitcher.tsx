import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-light/70 hover:text-light transition-colors px-3 py-2 rounded-full border border-light/20 hover:border-light/40"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs tracking-wide uppercase">{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 bg-dark border border-light/20 rounded-lg shadow-xl overflow-hidden z-50 min-w-[140px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  currentLang.code === lang.code
                    ? "bg-accent text-accent-foreground"
                    : "text-light/70 hover:bg-light/10 hover:text-light"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="text-xs tracking-wide uppercase">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
