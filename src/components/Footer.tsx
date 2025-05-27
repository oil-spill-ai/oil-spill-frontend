"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaTelegram, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
    const t = useTranslations("Footer");
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 text-base">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Ресурсы */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t("resources")}</h3>
                        <ul className="space-y-2">
                            <li>
                                {/*Документация*/}
                                <Link href="/documentation" className="hover:text-blue-300 transition-colors">
                                    {t("documentation")}
                                </Link>
                            </li>
                            <li>
                                {/*Политика конфиденциальности*/}
                                <Link href="/privacy" className="hover:text-blue-300 transition-colors">
                                    {t("privacyPolicy")}
                                </Link>
                            </li>
                            <li>
                                {/*Условия использования*/}
                                <Link href="/terms" className="hover:text-blue-300 transition-colors">
                                    {t("termsOfService")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t("contactUs")}</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <FaEnvelope />
                                <span>{t("email")}: oilspillai@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaPhone />
                                <span>{t("phone")}: +7 (XXX) XXX-XX-XX</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                                    <path d="M8 12.5v-1c0-.276.224-.5.5-.5h7c.276 0 .5.224.5.5v1c0 .276-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5z"></path>
                                </svg>
                                <span>{t("address")}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Социальные медиа */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t("followUs")}</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://t.me/oilspillai"
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
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Oil Spill AI</h2>
                        <p className="mb-4">
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