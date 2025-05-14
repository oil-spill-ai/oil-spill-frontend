"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaGlobe } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
    const pathname = usePathname();
    const t = useTranslations("Navbar");

    const getPathWithoutLocale = (path: string) => {
        return path.split("/").slice(2).join("/") || "/";
    };

    const currentPath = getPathWithoutLocale(pathname);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md p-6">
            <div className="container mx-auto flex justify-center items-center text-lg">
                {/* Логотип */}
                <div className="flex-1 flex justify-start">
                    <Link
                        href="/"
                        className="text-white text-2xl font-bold hover:text-blue-300 transition"
                    >
                        Oil Spill <b className="font-bold text-purple-400">AI</b>
                    </Link>
                </div>

                {/* Навигационные ссылки */}
                <div className="text-xl flex space-x-30 justify-center flex-1">
                    <Link
                        href="/about"
                        className={`transition ${currentPath === "/about" ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                    >
                        {t("about")}
                    </Link>
                    <Link
                        href="/team"
                        className={`transition ${currentPath === "/team" ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                    >
                        {t("team")}
                    </Link>
                    <Link
                        href="/"
                        className={`transition ${currentPath === "/" ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                    >
                        {t("home")}
                    </Link>
                </div>

                {/* Переключатель языков */}
                <div className="flex-1 flex justify-end">
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;