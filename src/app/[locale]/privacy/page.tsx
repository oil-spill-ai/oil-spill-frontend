"use client";

import React from "react";
import { useTranslations } from "next-intl";

const PrivacyPolicyPage = () => {
    const t = useTranslations("PrivacyPolicy");

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-2 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {t("title") || "Privacy Policy"}
                </h1>

                <div className="space-y-6 sm:space-y-8 text-base sm:text-lg text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">1. Information We Collect</h2>
                        <p>
                            We collect only the necessary information to provide our oil spill detection services:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Uploaded satellite images for analysis</li>
                            <li>Metadata associated with the images (coordinates, timestamp)</li>
                            <li>Basic account information for registered users</li>
                            <li>Service usage statistics</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">2. How We Use Your Information</h2>
                        <p>
                            The information we collect is used exclusively for:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Processing and analyzing satellite imagery</li>
                            <li>Improving our AI detection algorithms</li>
                            <li>Providing reports and visualizations</li>
                            <li>Service maintenance and improvement</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">3. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>End-to-end encryption for all data transfers</li>
                            <li>Secure storage with access controls</li>
                            <li>Regular security audits</li>
                            <li>Compliance with GDPR and other privacy regulations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">4. Data Retention</h2>
                        <p>
                            We retain uploaded images and analysis results for 30 days unless otherwise specified.
                            You may request deletion of your data at any time by contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">5. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy periodically. Significant changes will be notified
                            through our website or via email to registered users.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">6. Contact Us</h2>
                        <p>
                            For any questions regarding this Privacy Policy, please contact us at:
                            <br />
                            <a href="mailto:privacy@oilspillai.com" className="text-blue-300 hover:underline">
                                privacy@oilspillai.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;