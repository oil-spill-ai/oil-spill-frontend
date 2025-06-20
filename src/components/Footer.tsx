"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaTelegram, FaGithub, FaEnvelope, FaMapMarkerAlt} from "react-icons/fa";

const Footer = () => {
    const t = useTranslations("Footer");
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-8 px-2 sm:py-12 sm:px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4">
                    {/* Ресурсы */}
                    <div className="flex flex-col items-center sm:items-start">
                        <h3 className="text-xl font-bold mb-4">{t("resources")}</h3>
                        <ul className="space-y-2 w-full">
                            <li>
                                <Link href="/documentation" className="hover:text-blue-300 transition-colors">
                                    {t("documentation")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-blue-300 transition-colors">
                                    {t("privacyPolicy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-blue-300 transition-colors">
                                    {t("termsOfService")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div className="flex flex-col items-left sm:items-start">
                        <h3 className="text-xl font-bold mb-4">{t("contactUs")}</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center justify-center sm:justify-start gap-4">
                                <FaEnvelope />
                                <span>{t("email")}: oilspillai@gmail.com</span>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-6">
                                <FaMapMarkerAlt />
                                <span>{t("address")}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Социальные медиа */}
                    <div className="flex flex-col items-left sm:items-start">
                        <h3 className="text-xl font-bold mb-4">{t("followUs")}</h3>
                        <div className="flex gap-4 justify-center sm:justify-start">
                            <a
                                href="https://t.me/shorinss"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-300 transition-colors"
                                aria-label="Telegram"
                            >
                                <FaTelegram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://github.com/oil-spill-ai/oil-spill-devops"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-300 transition-colors"
                                aria-label="GitHub"
                            >
                                <FaGithub className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Лого и описание */}
                    <div className="flex flex-col items-left sm:items-start">
                        <h2 className="text-2xl font-bold mb-4">Oil Spill AI</h2>
                        <p className="mb-4 text-center sm:text-left">
                            {t("description")}
                        </p>
                    </div>
                </div>

                {/* Копирайт */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p>
                        {t("copyright", { year: currentYear })}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;