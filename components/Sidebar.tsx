"use client"
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
    const [active, setActive] = useState("Introduction");



    const SidebarComp = [
        {
            heading: "GETTING STARTED",
            items: [
                { name: "Introduction", link: "/docs/introduction" },
                { name: "Install Next.js", link: "/docs/install-nextjs" },
                { name: "Install Tailwind CSS", link: "/docs/install-tailwindcss" },

            ]
        },

        {
            heading: "BASIC COMPONENTS",
            items: [
                { name: "Animated Text", link: "/component/animated-text" },
                { name: "Animated Button", link: "/component/animated-button" },
                { name: "Animated Tabs", link: "/component/animated-tabs" },

            ]
        },

    ];

    return (
        <div className=" border-r border-gray-800 h-full pt-20 w-full flex justify-center">

            <div className="overflow-y-auto h-full w-full max-w-[200px] flex flex-col items-center gap-8">
                <div className="flex text-left flex-col gap-8" >
                    {SidebarComp.map((section, index) => (
                        <div key={index} className="w-full">
                            <h3 className="text-gray-600 text-sm uppercase tracking-wide mb-2">
                                {section.heading}
                            </h3>

                            <div className="flex flex-col  text-gray-400 text-sm ">
                                {section.items.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.link}
                                        onClick={() => setActive(item.name)}

                                        className="cursor-pointer hover:bg-gray-900 rounded-md p-2 transition-colors  duration-500 "
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}


                </div>
            </div>

        </div>
    )
}

export default Sidebar
