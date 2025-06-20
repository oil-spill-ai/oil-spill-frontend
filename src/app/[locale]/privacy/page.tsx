"use client";

import React from "react";
import { useTranslations } from "next-intl";

const PrivacyPolicyPage = () => {
    const t = useTranslations("PrivacyPolicy");

    const dataRetentionRows = ["row1", "row2", "row3", "row4", "row5"];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-2 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="py-2 text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {t("title") || "Privacy Policy"}
                </h1>
                <p className="text-center text-gray-400 mb-8 sm:mb-12">{t("last_updated")}</p>

                <div className="space-y-6 sm:space-y-8 text-base sm:text-lg text-gray-300 text-justify">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('introduction.heading')}</h2>
                        <p>{t('introduction.text')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('information_collection.heading')}</h2>
                        <p>{t('information_collection.paragraph1')}</p>
                        <ul className="list-none pl-4 mt-3 space-y-2">
                            <li><strong className="text-emerald-400">{t('information_collection.item1_title')}</strong> {t('information_collection.item1_text')}</li>
                            <li><strong className="text-emerald-400">{t('information_collection.item2_title')}</strong> {t('information_collection.item2_text')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('information_use.heading')}</h2>
                        <p>{t('information_use.paragraph1')}</p>
                        <p className="mt-2">{t('information_use.paragraph2')}</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>{t('information_use.list_item1')}</li>
                            <li>{t('information_use.list_item2')}</li>
                            <li>{t('information_use.list_item3')}</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('data_retention.heading')}</h2>
                        <p>{t('data_retention.paragraph1')}</p>
                        <p className="mt-2">{t('data_retention.paragraph2')}</p>
                        <p className="mt-2">{t('data_retention.paragraph3')}</p>
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full divide-y divide-gray-700 text-left">
                                <thead className="bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('data_retention.table_header_type')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('data_retention.table_header_purpose')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('data_retention.table_header_storage')}</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">{t('data_retention.table_header_retention')}</th>
                                </tr>
                                </thead>
                                <tbody className="bg-gray-900 bg-opacity-50 divide-y divide-gray-800">
                                {dataRetentionRows.map(row => (
                                    <tr key={row}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t(`data_retention.table_${row}_type`)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{t(`data_retention.table_${row}_purpose`)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{t(`data_retention.table_${row}_storage`)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{t(`data_retention.table_${row}_retention`)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4">{t('data_retention.paragraph4')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('policy_changes.heading')}</h2>
                        <p>{t('policy_changes.text')}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-blue-300">{t('contact.heading')}</h2>
                        <p>{t('contact.text')}</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;