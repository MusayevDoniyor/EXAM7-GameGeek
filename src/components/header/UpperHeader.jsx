import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiPhoneIncoming } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import gg from "../../assets/GG.svg";
import usa from "/USA-icon.png";
import spain from "/SPAIN-icon.png";
import uzb from "/UZB-icon.png";
import { LanguageContext } from "../LanguageProvider";

const UpperHeader = () => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const { language, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setLanguageOpen(false);
  };

  return (
    <div className="bg-[#0D2613] items-center px-4 md:px-16 py-3 md:py-7 flex flex-col md:flex-row justify-between font-inter">
      <div className="flex gap-4 md:gap-8 items-center mb-2 md:mb-0">
        <Link to="/">
          <img src={gg} alt="GG icon" />
        </Link>

        <Link
          to="tel:+4904-049-950"
          className="text-white flex gap-2 md:gap-4 items-center font-medium"
        >
          <FiPhoneIncoming className="size-5" />
          <span>+4904-049-950</span>
        </Link>
      </div>

      {language === "en" && (
        <div className="flex gap-2 md:gap-5 text-white items-center font-normal mb-2 md:mb-0">
          <p className="text-sm md:text-base">
            Get 50% Off on the Selected items
          </p>

          <span className="h-7 border-2 border-[#14FF00]"></span>

          <a href="/" className="text-sm md:text-base">
            Shop now
          </a>
        </div>
      )}

      {language === "es" && (
        <div className="flex gap-2 md:gap-5 text-white items-center font-normal mb-2 md:mb-0">
          <p className="text-sm md:text-base">
            Obtenga 50% de descuento en los artículos seleccionados
          </p>

          <span className="h-7 border-2 border-[#14FF00]"></span>

          <a href="/" className="text-sm md:text-base">
            Compra ahora
          </a>
        </div>
      )}

      {language === "uz" && (
        <div className="flex gap-2 md:gap-5 text-white items-center font-normal mb-2 md:mb-0">
          <p className="text-sm md:text-base">
            Tanlangan mahsulotlarga 50% chegirma oling
          </p>

          <span className="h-7 border-2 border-[#14FF00]"></span>

          <a href="/" className="text-sm md:text-base">
            Hozir sotib oling
          </a>
        </div>
      )}

      <div className="text-white items-center flex gap-4 md:gap-14 font-medium">
        <div className="items-center flex flex-col">
          <div
            className={`flex gap-2 md:gap-4 items-center cursor-pointer relative ${
              languageOpen ? "z-10" : ""
            }`}
            onClick={() => setLanguageOpen(!languageOpen)}
          >
            <span
              className={`transition duration-300 ease-in-out ${
                languageOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <FaChevronDown />
            </span>

            <span>{selectedLanguage}</span>

            {selectedLanguage === "English" && (
              <img src={usa} className="w-6 h-4" alt="Icon of flag USA" />
            )}

            {selectedLanguage === "Spanish" && (
              <img src={spain} className="w-6 h-6" alt="Icon of flag SPAIN" />
            )}

            {selectedLanguage === "Uzbek" && (
              <img src={uzb} className="w-6 h-7" alt="Icon of flag UZB" />
            )}

            {languageOpen && (
              <ul className="absolute top-full left-0 bg-[#0D2613] py-2 px-4 rounded-md shadow-md">
                <li
                  className="flex items-center gap-2 hover:text-[#14FF00] cursor-pointer"
                  onClick={() => {
                    handleLanguageChange("en");
                    handleLanguageSelect("English");
                  }}
                >
                  <img src={usa} className="w-5 h-3" alt="Icon of flag USA" />
                  <span>English</span>
                </li>

                <li
                  className="flex items-center gap-2 hover:text-[#14FF00] cursor-pointer"
                  onClick={() => {
                    handleLanguageChange("es");
                    handleLanguageSelect("Spanish");
                  }}
                >
                  <img
                    src={spain}
                    className="w-5 h-5"
                    alt="Icon of flag SPAIN"
                  />
                  <span>Spanish</span>
                </li>

                <li
                  className="flex items-center gap-2 hover:text-[#14FF00] cursor-pointer"
                  onClick={() => {
                    handleLanguageChange("uz");
                    handleLanguageSelect("Uzbek");
                  }}
                >
                  <img src={uzb} className="w-5 h-6" alt="Icon of flag UZB" />
                  <span>Uzbek</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="flex gap-2 md:gap-4 items-center cursor-pointer">
          <MdLanguage className="size-5" />
          <span className="text-sm md:text-base">Location</span>
        </div>
      </div>
    </div>
  );
};

export default UpperHeader;
