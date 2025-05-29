"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TeamMemberModal from "@/components/TeamMemberModal";

const TeamPage = () => {
    const t = useTranslations("TeamPage");
    const [selectedMember, setSelectedMember] = useState<string | null>(null);

    const teamMembers = [
        {
            id: "shorin",
            nameKey: "team.shorin.name",
            role: "Team Lead",
            image: "/photos/shorin.jpg",
        },
        {
            id: "borisov",
            nameKey: "team.borisov.name",
            role: "DevOps",
            image: "/photos/borisov.jpg",
        },
        {
            id: "mitrofanov",
            nameKey: "team.mitrofanov.name",
            role: "Lead Backend Developer",
            image: "/photos/mitrofanov.jpg",
        },
        {
            id: "yashin",
            nameKey: "team.yashin.name",
            role: "Lead Frontend Developer",
            image: "/photos/yashin.jpg",
        },
        {
            id: "tokarev",
            nameKey: "team.tokarev.name",
            role: "ML-Engineer",
            image: "/photos/tokarev.jpg",
        },
        {
            id: "anisimov",
            nameKey: "team.anisimov.name",
            role: "ML-Engineer",
            image: "/photos/anisimov.jpg",
        },
        {
            id: "krylov",
            nameKey: "team.krylov.name",
            role: "Backend Developer",
            image: "/photos/krylov.jpg",
        },
        {
            id: "ivanchenko",
            nameKey: "team.ivanchenko.name",
            role: "Backend Developer",
            image: "/photos/ivanchenko.jpg",
        },
        {
            id: "chikunov",
            nameKey: "team.chikunov.name",
            role: "Frontend Developer",
            image: "/photos/chikunov.jpg",
        },
        {
            id: "titova",
            nameKey: "team.titova.name",
            role: "Technical Writer",
            image: "/photos/titova.jpg",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-20">
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 leading-relaxed">
                        {t("heroTitle")}
                    </h1>
                    <p className="text-2xl md:text-3xl max-w-5xl mx-auto text-blue-100 mt-6">
                        {t("heroSubtitle")}
                    </p>
                </motion.div>
            </section>
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 leading-relaxed"
                >
                    {t("meetTeam")}
                </motion.h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 items-stretch">
                    {teamMembers.map((member, index) => (
                        <TeamMemberModal
                            key={index}
                            contentKey={`TeamPage.team.${member.id}.bio`}
                            nameKey={`TeamPage.team.${member.id}.name`}
                            isOpen={selectedMember === member.id}
                            onClose={() => setSelectedMember(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="flex flex-col justify-between bg-gray-800/40 p-6 rounded-2xl text-center border-2 border-gray-600 hover:border-purple-400/50 transition-all h-[350px] cursor-pointer"
                                onClick={() => setSelectedMember(member.id)}
                            >
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700 overflow-hidden border-2 border-gray-500">
                                    <Image
                                        src={member.image}
                                        alt={t(member.nameKey)}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold leading-snug mb-2">
                                    {t(member.nameKey).split(" ").map((word, i) => (
                                        <div key={i}>{word}</div>
                                    ))}
                                </h3>
                                <p className="text-purple-400 text-2xl font-regular line-clamp-2 mt-auto">
                                    {member.role}
                                </p>
                            </motion.div>
                        </TeamMemberModal>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TeamPage;