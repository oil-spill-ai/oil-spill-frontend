"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const DocumentationPage = () => {
    const t = useTranslations("Documentation");
    const [activeSection, setActiveSection] = useState<string | null>("system_overview");

    const toggleSection = (sectionId: string) => {
        setActiveSection(activeSection === sectionId ? null : sectionId);
    };

    const techStack = {
        backend: ["tech1", "tech2", "tech3", "tech4", "tech5", "tech6", "tech7"],
        frontend: ["tech1", "tech2", "tech3", "tech4", "tech5", "tech6"],
        ml: ["tech1", "tech2", "tech3", "tech4", "tech5"],
    };

    const workflowStages = ["stage1", "stage2", "stage3", "stage4", "stage5", "stage6"];

    const teamMembers = ["member1", "member2", "member3", "member4", "member5", "member6", "member7", "member8", "member9", "member10"];

    const sections = [
        { id: "system_overview", heading: t("system_overview.heading") },
        { id: "tech_stack", heading: t("tech_stack.heading") },
        { id: "workflow", heading: t("workflow.heading") },
        { id: "team", heading: t("team.heading") },
    ];

    const renderContent = (sectionId: string) => {
        switch (sectionId) {
            case "system_overview":
                return (
                    <div className="space-y-4">
                        <p>{t('system_overview.paragraph1')}</p>
                        <p>{t('system_overview.paragraph2')}</p>
                        <ul className="list-none pl-6 space-y-3">
                            <li><strong className="text-blue-300">{t('system_overview.component1_title')}</strong> {t('system_overview.component1_text')}</li>
                            <li><strong className="text-blue-300">{t('system_overview.component2_title')}</strong> {t('system_overview.component2_text')}</li>
                            <li><strong className="text-blue-300">{t('system_overview.component3_title')}</strong> {t('system_overview.component3_text')}</li>
                        </ul>
                        <p>{t('system_overview.paragraph3')}</p>
                    </div>
                );
            case "tech_stack":
                return (
                    <div className="space-y-6">
                        <p>{t('tech_stack.intro')}</p>

                        {/* Backend */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-emerald-400">{t('tech_stack.backend_heading')}</h3>
                            <ul className="list-none pl-4 space-y-3">
                                {techStack.backend.map(item => (
                                    <li key={item}><strong className="text-blue-300">{t(`tech_stack.backend_${item}_title`)}</strong> {t(`tech_stack.backend_${item}_text`)}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Frontend */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-emerald-400">{t('tech_stack.frontend_heading')}</h3>
                            <ul className="list-none pl-4 space-y-3">
                                {techStack.frontend.map(item => (
                                    <li key={item}><strong className="text-blue-300">{t(`tech_stack.frontend_${item}_title`)}</strong> {t(`tech_stack.frontend_${item}_text`)}
                                        {item === 'tech4' && (
                                            <ul className="list-disc pl-6 mt-2">
                                                <li>{t('tech_stack.frontend_tech4_list_item1')}</li>
                                                <li>{t('tech_stack.frontend_tech4_list_item2')}</li>
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ML Module */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-emerald-400">{t('tech_stack.ml_heading')}</h3>
                            <ul className="list-none pl-4 space-y-3">
                                {techStack.ml.map(item => (
                                    <li key={item}><strong className="text-blue-300">{t(`tech_stack.ml_${item}_title`)}</strong> {t(`tech_stack.ml_${item}_text`)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case "workflow":
                return (
                    <div className="space-y-6">
                        <p>{t('workflow.intro')}</p>
                        <ol className="list-none pl-6 space-y-4">
                            {workflowStages.map(stage => (
                                <li key={stage}>
                                    <strong className="text-blue-300">{t(`workflow.${stage}_title`)}</strong>
                                    <p className="mt-1">{t(`workflow.${stage}_text`)}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                );
            case "team":
                return (
                    <div className="space-y-4">
                        <p>{t('team.intro')}</p>
                        <ul className="list-disc pl-6 space-y-2">
                            {teamMembers.map(member => (
                                <li key={member}>{t(`team.${member}`)}</li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-2 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="py-2 text-2xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {t("title") || "Technical Documentation"}
                </h1>

                <div className="space-y-4">
                    {sections.map((section) => (
                        <div key={section.id} className="border-b border-gray-700 pb-4">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between text-left py-4 focus:outline-none group"
                            >
                                <div className="flex items-center">
                                    <span className="mr-4 text-blue-400">
                                        {activeSection === section.id ? (
                                            <FaChevronDown className="h-5 w-5" />
                                        ) : (
                                            <FaChevronRight className="h-5 w-5" />
                                        )}
                                    </span>
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold group-hover:text-blue-300 transition-colors">
                                        {section.heading}
                                    </h2>
                                </div>
                            </button>

                            {activeSection === section.id && (
                                <div className="pl-2 sm:pl-12 pr-2 sm:pr-4 pt-6 pb-6 text-gray-300 text-base sm:text-lg text-justify">
                                    {renderContent(section.id)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;