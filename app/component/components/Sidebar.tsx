"use client"
import Link from "next/link";
import React, { useState } from "react";
interface sidebarprops {
    sidebarComp?: { name: string }[];
    activeComp: string;
    setActiveComp: (name: string) => void;
}

const Sidebar: React.FC<sidebarprops> = ({
    sidebarComp, activeComp , setActiveComp
}) => {

    const SidebarComp = [
        {
            heading: "COMPONENTS",
            items: [
                { name: "Button", link: "/component/button" },
                { name: "Card", link: "/component/card" },
                { name: "Input", link: "/component/input" },

            ]
        },

    ];

    return (
        <div className=" border-r border-gray-800 h-full pt-20 w-full flex justify-center">

            <div className="overflow-y-auto h-full w-full  flex flex-col items-center gap-8">
                <div className="flex text-left flex-col gap-8" >
                    {SidebarComp.map((section, index) => (
                        <div key={index} className="w-full">
                            <Link href="/component/button">
                                <h3 className="text-gray-200 font-bold text-lg uppercase tracking-wide mb-2">
                                    {section.heading}
                                </h3>
                            </Link>


                            <div className="flex flex-col text-left text-gray-300 text-md font-bold  w-full">
                                {section.items.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.link}
                                        onClick={() => setActiveComp(item.name)}

                                        className={`px-2 py-1 m-1 rounded 
                                                ${activeComp === item.name
                                                ? " border-1 border-gray-100 text-white font-semibold transition-smooth duration-300"
                                                : "text-gray-300 hover:text-white"
                                            }`}

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
