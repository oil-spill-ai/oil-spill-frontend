"use client";

import React from "react";
import { useTranslations } from "next-intl";

const TermsOfServicePage = () => {
    const t = useTranslations("TermsOfService");

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-2 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="py-2 text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {t("title") || "Terms of Service"}
                </h1>
                <p className="text-center text-gray-400 mb-8 sm:mb-12">{t("last_updated")}</p>

                <div className="space-y-6 sm:space-y-8 text-base sm:text-lg text-gray-300 text-justify">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('acceptance.heading')}</h2>
                        <p>{t('acceptance.text')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('description.heading')}</h2>
                        <p>{t('description.text')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('user_responsibilities.heading')}</h2>
                        <p>{t('user_responsibilities.paragraph1')}</p>
                        <ul className="list-none pl-4 mt-3 space-y-2">
                            <li><strong className="text-emerald-400">{t('user_responsibilities.item1_title')}</strong> {t('user_responsibilities.item1_text')}</li>
                            <li><strong className="text-emerald-400">{t('user_responsibilities.item2_title')}</strong> {t('user_responsibilities.item2_text')}</li>
                            <li><strong className="text-emerald-400">{t('user_responsibilities.item3_title')}</strong> {t('user_responsibilities.item3_text')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('ip_rights.heading')}</h2>
                        <ul className="list-none pl-4 mt-3 space-y-2">
                            <li><strong className="text-emerald-400">{t('ip_rights.item1_title')}</strong> {t('ip_rights.item1_text')}</li>
                            <li><strong className="text-emerald-400">{t('ip_rights.item2_title')}</strong> {t('ip_rights.item2_text')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('disclaimers.heading')}</h2>
                        <p>{t('disclaimers.paragraph1')}</p>
                        <ul className="list-none pl-4 mt-3 space-y-2">
                            <li><strong className="text-emerald-400">{t('disclaimers.item1_title')}</strong> {t('disclaimers.item1_text')}</li>
                            <li><strong className="text-emerald-400">{t('disclaimers.item2_title')}</strong> {t('disclaimers.item2_text')}</li>
                            <li><strong className="text-emerald-400">{t('disclaimers.item3_title')}</strong> {t('disclaimers.item3_text')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('termination.heading')}</h2>
                        <p>{t('termination.text')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('general.heading')}</h2>
                        <ul className="list-none pl-4 mt-3 space-y-2">
                            <li><strong className="text-emerald-400">{t('general.item1_title')}</strong> {t('general.item1_text')}</li>
                            <li><strong className="text-emerald-400">{t('general.item2_title')}</strong> {t('general.item2_text')}</li>
                            <li><strong className="text-emerald-400">{t('general.item3_title')}</strong> {t('general.item3_text')}</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;