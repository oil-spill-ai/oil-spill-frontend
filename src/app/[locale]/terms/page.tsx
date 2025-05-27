"use client";

import React from "react";
import { useTranslations } from "next-intl";

const TermsOfServicePage = () => {
    const t = useTranslations("TermsOfService");

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {t("title") || "Terms of Service"}
                </h1>

                <div className="space-y-8 text-lg text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the Oil Spill AI service, you agree to be bound by these Terms of Service.
                            If you do not agree to all the terms, you may not use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">2. Service Description</h2>
                        <p>
                            Oil Spill AI provides artificial intelligence-based analysis of satellite and aerial imagery
                            to detect oil spills and other environmental pollution. The service includes:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Image analysis and processing</li>
                            <li>Pollution detection and classification</li>
                            <li>Report generation and visualization</li>
                            <li>API access for integration</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">3. User Responsibilities</h2>
                        <p>
                            As a user of our service, you agree to:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Provide accurate information when registering</li>
                            <li>Use the service only for lawful purposes</li>
                            <li>Not attempt to reverse-engineer or disrupt the service</li>
                            <li>Comply with all applicable laws and regulations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">4. Intellectual Property</h2>
                        <p>
                            All intellectual property rights in the service, including our AI models, algorithms, and
                            software, remain the exclusive property of Oil Spill AI. You retain rights to your uploaded
                            content but grant us a license to process it for service provision.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">5. Limitations of Liability</h2>
                        <p>
                            Oil Spill AI provides the service "as is" without warranties of any kind. We are not liable
                            for any direct, indirect, incidental, or consequential damages resulting from the use of our
                            service. While we strive for accuracy, we do not guarantee 100% detection of all oil spills.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">6. Modifications to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. Continued use of the service after
                            changes constitutes acceptance of the new terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">7. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the Russian Federation,
                            without regard to its conflict of law provisions.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;