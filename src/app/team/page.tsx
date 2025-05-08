"use client";

import { motion } from "framer-motion";
import Tooltip from "@/components/Tooltip";
import Image from "next/image";

const TeamPage = () => {
    const teamMembers = [
        {
            name: "Shorin Sergey",
            role: "Team Lead",
            image: "/photos/shorin.jpg",
            tooltip: `-`
        },
        {
            name: "Nikita -",
            role: "DevOps",
            image: "/photos/?.jpg",
            tooltip: `-`
        },
        {
            name: "Bogdan Mitrofanov",
            role: "Lead Backend Developer",
            image: "/photos/mitrofanov.jpg",
            tooltip: `-`
        },
        {
            name: "Yashin Sergey",
            role: "Lead Frontend Developer",
            image: "/photos/yashin.jpg",
            tooltip: `<p>My name is Sergey Yashin. I am engaged in frontend development in our team. I am studying at the Moscow Aviation Institute in the M3O-332B-22 group.</p>
                      <p>I am fond of the frontend component of web resources, 3D modeling, I like to read and walk.</p>
                      <p>I believe that the project we are working on is very beneficial for the environment. With its help, it will be easier to detect oil pollution on the water surface of the planet and eliminate them accordingly, which will have a very positive impact on the environment.</p>
                      <p>When developing the project, I used React and Next.js technologies. Also, I needed the ThreeJS library to visualize the 3D model.</p>`
        },
        {
            name: "Inav Anisimov",
            role: "Lead Machine Learning Engineer",
            image: "/photos/anisimov.jpg",
            tooltip: `<p>My name is Ivan Anisimov. In our team, I am responsible for machine learning, developing and training neural networks. I am studying at the Moscow Aviation Institute, in the M3O-332B-22 group.</p>
                      <p>My main task in the project is to train the YOLOv11 model to accurately segment oil slicks on satellite images. To do this, I used the Ultralytics library. This part of the work is extremely important because the effectiveness of the entire system depends on the quality of contamination detection.</p>
                      <p>In my free time, I enjoy sports, especially football and tennis. I love history, I often listen to music and find inspiration in different genres.</p>
                      <p>I am sure that our project will bring real benefits to the environment, helping to quickly identify and eliminate oil spills.</p>`
        },
        {
            name: "Vladislav Tokarev",
            role: "Machine Learning Engineer",
            image: "/photos/tokarev.jpg",
            tooltip: `-`
        },
        {
            name: "Artem Krylov",
            role: "Backend Developer",
            image: "/photos/krylov.jpg",
            tooltip: `-`
        },
        {
            name: "Dmitriy Ivanchenko",
            role: "Backend Developer",
            image: "/photos/ivanchenko.jpg",
            tooltip: `-`
        },
        {
            name: "Yuriy Chikunov",
            role: "Frontend Developer",
            image: "/photos/chikunov.jpg",
            tooltip: `-`
        },
        {
            name: "Polina Titova",
            role: "Technical Writer",
            image: "/photos/titova.jpg",
            tooltip: `<p>My name is Polina Titova, and I am responsible for creating and maintaining technical documentation in our team. My role is a technical writer.
                      <p>I am a student at the Moscow Aviation Institute, studying in the M6O-221BV-23 group. In my free time I am fond of kettlebell lifting, I like outdoor activities and dancing. I am also learning 3D modeling in the COMPASS program.</p>
                      <p>I consider our project to be extremely promising and beneficial for the environment, and I really hope that its implementation will not stop at the university level. And he will go further and be able to gain a foothold in large companies, as a basis for the development and implementation of larger-scale and effective solutions for the protection of water resources.</p>`
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-20">
            {/* Hero */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 leading-relaxed">
                        Our team
                    </h1>
                    <p className="text-2xl md:text-3xl max-w-5xl mx-auto text-blue-100 mt-6">
                        The enthusiasts behind Oil Slick Detection Technology
                    </p>
                </motion.div>
            </section>

            {/* Команда */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 leading-relaxed"
                >
                    Meet our experts
                </motion.h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 items-stretch">
                    {teamMembers.map((member, index) => (
                        <Tooltip key={index} content={member.tooltip}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="flex flex-col justify-between bg-gray-800/40 p-6 rounded-2xl text-center border-2 border-gray-600 hover:border-purple-400/50 transition-all h-[350px]"
                            >
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700 overflow-hidden border-2 border-gray-500">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold leading-snug mb-2">
                                    {member.name.split(" ").map((word, i) => (
                                        <div key={i}>{word}</div>
                                    ))}
                                </h3>
                                <p className="text-purple-400 text-2xl font-regular line-clamp-2 mt-auto">
                                    {member.role}
                                </p>
                            </motion.div>
                        </Tooltip>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TeamPage;
