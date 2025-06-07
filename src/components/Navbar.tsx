"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaGlobe, FaBars } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

const Navbar = () => {
    const pathname = usePathname();
    const t = useTranslations("Navbar");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getPathWithoutLocale = (path: string) => {
        return path.split("/").slice(2).join("/") || "/";
    };

    const currentPath = getPathWithoutLocale(pathname);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md p-4 sm:p-6">
            <div className="container mx-auto flex justify-between items-center text-lg">
                <div className="flex w-full items-center">
                    {/* Логотип */}
                    <div className="flex-1 flex justify-start min-w-0">
                        <Link
                            href="/"
                            className="text-white text-2xl font-bold hover:text-blue-300 transition"
                        >
                            Oil Spill <b className="font-bold text-purple-400">AI</b>
                        </Link>
                    </div>
                    {/* Навигационные ссылки (десктоп) */}
                    <div className="hidden sm:flex flex-1 justify-center text-xl space-x-6 min-w-0 basis-0">
                        <Link
                            href="/about"
                            className={`transition ${currentPath === "/about" ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                        >
                            <span className="whitespace-nowrap">{t("about")}</span>
                        </Link>
                        <Link
                            href="/team"
                            className={`transition ${currentPath === "/team" ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                        >
                            {t("team")}
                        </Link>
                        <Link
                            href="/"
                            className={`transition ${currentPath === "/" ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'} sm:mr-8 md:mr-0`}
                        >
                            {t("home")}
                        </Link>
                    </div>
                    {/* Переключатель языков и бургер-меню */}
                    <div className="flex flex-1 justify-end items-center gap-1 sm:gap-0 grow-0 shrink-0 basis-auto min-w-fit">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center space-x-1 text-white hover:text-blue-300 transition outline-none">
                                <FaGlobe className="h-6 w-6" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-900 text-white text-xl px-4 py-1 rounded-2xl md mt-2">
                                <DropdownMenuItem asChild>
                                    <Link href={pathname.replace(/^\/(en|ru|de)/, "/en")} className="block w-full py-2 hover:text-blue-300 outline-none">
                                        English
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={pathname.replace(/^\/(en|ru|de)/, "/ru")} className="block w-full py-2 hover:text-blue-300 outline-none">
                                        Русский
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* Бургер-меню для мобильных */}
                        <div className="sm:hidden flex items-center ml-2">
                            <button
                                className="text-white focus:outline-none"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Open menu"
                            >
                                <FaBars className="h-7 w-7" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Мобильное меню */}
            <div
                className={`sm:hidden absolute top-full left-0 right-0 z-50 flex flex-col space-y-4 text-xl shadow-lg bg-gray-900/95 px-4 py-4
                    transition-all duration-300 origin-top
                    ${mobileMenuOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'}`}
                style={{ transformOrigin: 'top' }}
            >
                <Link
                    href="/about"
                    className={`transition ${currentPath === "/about" ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <span className="whitespace-nowrap">{t("about")}</span>
                </Link>
                <Link
                    href="/team"
                    className={`transition ${currentPath === "/team" ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    {t("team")}
                </Link>
                <Link
                    href="/"
                    className={`transition ${currentPath === "/" ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    {t("home")}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;