import React from "react";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("i18nextLng", e.target.value);
  };

  return (
    <div className="ml-4">
      <label htmlFor="language" className="sr-only">Språk</label>
      <select
        id="language"
        value={i18n.language}
        onChange={handleChange}
        className="border border-gray-300 p-1 rounded text-sm"
      >
        <option value="no">Norsk</option>
        <option value="en">English</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  );
}
