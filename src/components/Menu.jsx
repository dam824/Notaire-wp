"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSiteLogo } from "@/inc/wpData";

const Menu = () => {
  const [pages, setPages] = useState([]);
  const [subPages, setSubPages] = useState([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  let timeoutId;

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch(
          "https://darkgrey-eland-667117.hostingersite.com/wp-json/wp/v2/pages"
        );
        const data = await response.json();

        const order = ["Le Cabinet", "Nos Expertises", "Actualités", "Contacter le cabinet"];
        const mainPages = order.map(title => data.find(page => page.title.rendered === title)).filter(Boolean);
        const subPages = data.filter(page => ["Contentieux", "Conseil"].includes(page.title.rendered));

        const logoUrl = await getSiteLogo();

        setPages(mainPages);
        setSubPages(subPages);
        setLogo(logoUrl);
      } catch (error) {
        console.error("Erreur lors de la récupération des pages :", error);
      }
    };

    fetchPages();
  }, []);

  // Fonction pour ouvrir le sous-menu Desktop
  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsSubMenuOpen(true);
  };

  // Fonction pour fermer le sous-menu avec un délai
  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsSubMenuOpen(false);
    }, 200);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-[80px] lg:h-[150px]">
      {/* Logo */}
      <Link href="/">
        {logo ? (
          <Image src={logo} alt="KLP Partners logo" width={120} height={50} priority />
        ) : (
          <span className="text-gray-500">Logo</span>
        )}
      </Link>

      {/* Bouton Burger pour Mobile */}
      <button
        className="lg:hidden text-black text-3xl"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        ☰
      </button>

      {/* Menu Desktop */}
      <nav className="hidden lg:flex">
        <ul className="flex space-x-16">
          {pages.map((page) => (
            <li
              key={page.id}
              className="relative group"
              onMouseEnter={page.title.rendered === "Nos Expertises" ? handleMouseEnter : null}
              onMouseLeave={page.title.rendered === "Nos Expertises" ? handleMouseLeave : null}
            >
              <Link href={`/${page.slug}`} className="text-black font-semibold hover:text-red-600 transition">
                {page.title.rendered}
              </Link>

              {/* Sous-menu Desktop */}
              {page.title.rendered === "Nos Expertises" && isSubMenuOpen && subPages.length > 0 && (
                <ul
                  className="absolute left-0 top-full bg-white shadow-md rounded-md mt-2 w-48"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {subPages.map((subPage) => (
                    <li key={subPage.id} className="px-4 py-2 hover:bg-gray-100">
                      <Link href={`/${subPage.slug}`} className="block text-black hover:text-red-600 transition">
                        {subPage.title.rendered}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu Mobile (animation slide-in de droite à gauche) */}
      <nav
        className={`lg:hidden fixed top-0 right-0 w-full h-screen bg-white z-50 flex flex-col items-center shadow-lg 
        transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Bouton pour fermer le menu */}
        <button
          className="absolute top-5 right-5 text-black text-3xl"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ✕
        </button>

        {/* Liste des pages */}
        <ul className="mt-16 space-y-6 text-lg w-full text-center">
          {pages.map((page) => (
            <li key={page.id} className="relative">
              {/* Vérifie si c'est "Nos Expertises" */}
              {page.title.rendered === "Nos Expertises" ? (
                <button
                  className="w-full text-black font-semibold flex items-center justify-center hover:text-red-600 transition p-3"
                  onClick={() => setIsMobileSubMenuOpen(!isMobileSubMenuOpen)}
                >
                  {page.title.rendered}
                  <span className="ml-2">{isMobileSubMenuOpen ? "▲" : "▼"}</span>
                </button>
              ) : (
                <Link
                  href={`/${page.slug}`}
                  className="block text-black font-semibold hover:text-red-600 transition p-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {page.title.rendered}
                </Link>
              )}

              {/* Sous-menu Mobile */}
              {page.title.rendered === "Nos Expertises" && isMobileSubMenuOpen && subPages.length > 0 && (
                <ul className="mt-2 space-y-2 bg-gray-100 rounded-md p-2">
                  {subPages.map((subPage) => (
                    <li key={subPage.id}>
                      <Link
                        href={`/${subPage.slug}`}
                        className="block text-black hover:text-red-600 transition p-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subPage.title.rendered}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
