"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md p-6">
            <div className="container mx-auto flex justify-start space-x-40 items-center text-lg">
                {/* Логотип */}
                <Link
                    href="/"
                    className="text-white text-2xl font-bold hover:text-blue-300 transition"
                >
                    Oil Spill <b className="font-bold text-purple-400">AI</b>
                </Link>
                {/* Навигационные ссылки */}
                <div className="text-xl flex space-x-30">
                    <Link
                        href="/about"
                        className={`transition ${pathname === '/about' ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                    >
                        About
                    </Link>
                    <Link
                        href="/team"
                        className={`transition ${pathname === '/team' ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                    >
                        Our Team
                    </Link>
                    <Link
                        href="/"
                        className={`transition ${pathname === '/' ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300'}`}
                    >
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;