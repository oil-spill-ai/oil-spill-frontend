"use client";

import { motion } from "framer-motion";

const TeamPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-20">
            {/* Hero секция */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Our team
                    </h1>
                    <p className="text-xl md:text-2xl max-w-4xl mx-auto text-blue-100">
                        The enthusiasts behind Oil Slick Detection Technology
                    </p>
                </motion.div>
            </section>

            {/* Команда */}
            <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            name: "Shorin Sergey",
                            role: "Team Lead",
                            bio: "Специалист по компьютерному зрению с 10-летним опытом",
                            emoji: "👨‍💻"
                        },
                        {
                            name: "Мария Иванова",
                            role: "Data Scientist",
                            bio: "Разработчик алгоритмов машинного обучения",
                            emoji: "👩‍🔬"
                        },
                        {
                            name: "Дмитрий Смирнов",
                            role: "Фронтенд разработчик",
                            bio: "Создатель интерфейсов и визуализаций",
                            emoji: "👨‍🎨"
                        },
                        {
                            name: "Елена Кузнецова",
                            role: "Эколог",
                            bio: "Эксперт по нефтяным загрязнениям",
                            emoji: "👩‍🌾"
                        }
                    ].map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800/50 p-6 rounded-xl text-center border border-gray-700 hover:border-emerald-400 transition-all"
                        >
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center text-4xl">
                                {member.emoji}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                            <p className="text-blue-400 mb-3">{member.role}</p>
                            <p className="text-gray-300">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TeamPage;