"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaGlobe, FaBars } from "react-icons/fa";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getPathWithoutLocale = (path: string) => {
    return path.split("/").slice(2).join("/") || "/";
  };

  const currentPath = getPathWithoutLocale(pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md p-4 sm:p-6">
      <div className="container mx-auto flex justify-between items-center text-base sm:text-lg">
        {/* Логотип */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-white text-lg sm:text-2xl font-bold hover:text-blue-300 transition"
          >
            Oil Spill <b className="font-bold text-purple-400">AI</b>
          </Link>
        </div>

        {/* Бургер-меню для мобильных */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            className="sm:hidden text-white hover:text-blue-300 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Переключатель языков */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-white hover:text-blue-300 transition outline-none">
              <FaGlobe className="h-5 w-5 sm:h-6 sm:w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 text-white text-sm sm:text-base px-3 sm:px-4 py-1 rounded-2xl mt-2">
              <DropdownMenuItem asChild>
                <Link
                  href={pathname.replace(/^\/(en|ru|de)/, "/en")}
                  className="block w-full py-1 sm:py-2 hover:text-blue-300 outline-none"
                >
                  English
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={pathname.replace(/^\/(en|ru|de)/, "/ru")}
                  className="block w-full py-1 sm:py-2 hover:text-blue-300 outline-none"
                >
                  Русский
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Навигационные ссылки */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row sm:space-x-6 absolute sm:static top-16 left-0 right-0 bg-gray-900 sm:bg-transparent p-4 sm:p-0 sm:items-center text-center sm:text-left space-y-4 sm:space-y-0 transition-all duration-300`}
        >
          <Link
            href="/"
            className={`transition ${
              currentPath === "/"
                ? "text-blue-300 font-medium"
                : "text-white hover:text-blue-300"
            } text-base sm:text-lg`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("home")}
          </Link>
          <Link
            href="/about"
            className={`transition ${
              currentPath === "/about"
                ? "text-blue-300 font-medium"
                : "text-white hover:text-blue-300"
            } text-base sm:text-lg`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("about")}
          </Link>
          <Link
            href="/team"
            className={`transition ${
              currentPath === "/team"
                ? "text-blue-300 font-medium"
                : "text-white hover:text-blue-300"
            } text-base sm:text-lg`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("team")}
          </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
