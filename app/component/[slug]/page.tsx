"use client"
import Navbar from "@/app/component/components/Navbar";
import Sidebar from "@/app/component/components/Sidebar";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { CodeBlock } from "../ui/code-block";
import { Button } from "../ui/Button";
import { components } from "@/app/data/Data";



const page = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params);
    const comp = components.find(c => c.slug === slug);
    if (!comp) {
        notFound;
    }
    const [copied, setCopied] = useState<boolean>(false);
    const [activeComp, setActiveComp] = useState<string | undefined>("Button");

    useEffect(() => {
    setActiveComp(comp?.name);
}, [slug, comp]);


    const handleCopy = async () => {
        await navigator.clipboard.writeText(comp?.code || "");
        setCopied(true);

        setTimeout(() => setCopied(false), 1500);
    };


    return (
        <div className='min-h-screen border-1 border-gray-800 border-y-0 flex flex-col text-neutral-200'>
            <Navbar />
            <div className='flex mt-10 h-[calc(100vh-20px)]'>
                <div className='hidden md:flex md:w-[30%] lg:w-[20%]  h-full overflow-y-auto'>
                    <Sidebar activeComp={activeComp} setActiveComp={setActiveComp} sidebarComp={components} />


                </div>
                <div className='w-full md:w-[70%] lg:w-[80%] flex flex-col p-20  h-full overflow-y-auto '>
                    <h1 className="font-extrabold text-4xl py-2">{comp?.name}</h1>
                    <div className="text-lg font-semibold py-2">
                        {comp?.description}
                    </div>
                    <div className="py-5">
                        <h3 className="font-bold text-2xl py-2 uppercase">Preview</h3>
                        <div className="relative p-6 font-neutral-400  bg-neutral-900/90 rounded-md mt-3">
                            {comp?.preview}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl py-2 uppercase">Code</h3>
                        <CodeBlock
                            language="tsx"
                            filename={`${comp?.name}`}
                            highlightLines={[9, 13, 14, 18]}
                            code={comp?.code || ""}
                        />

                    </div>
                    {/* Props Table */}
                    <section className="mb-20">
                        <div className="flex items-center justify-between my-3">
                            <h2 className="text-2xl font-bold py-5 uppercase tracking-wider ">
                                Props
                            </h2>
                        </div>
                        <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur p-6 shadow overflow-x-auto">
                            {comp?.props && comp?.props.length > 0 ? (
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="text-left border-b border-neutral-800">
                                            <th className="py-2 pr-4 font-semibold text-neutral-100">
                                                Prop
                                            </th>
                                            <th className="py-2 pr-4 font-semibold text-neutral-100">
                                                Type
                                            </th>
                                            <th className="py-2 pr-4 font-semibold text-neutral-100">
                                                Default
                                            </th>
                                            <th className="py-2 font-semibold text-neutral-100">
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comp?.props.map((prop) => (
                                            <tr
                                                key={prop.name}
                                                className="border-b border-neutral-800"
                                            >
                                                <td className="py-2 pr-4 font-mono text-blue-300">
                                                    {prop.name}
                                                </td>
                                                <td className="py-2 pr-4 font-mono text-emerald-300">
                                                    {prop.type}
                                                </td>
                                                <td className="py-2 pr-4 text-neutral-400">
                                                    {prop.default || (
                                                        <span className="italic text-xs">-</span>
                                                    )}
                                                </td>
                                                <td className="py-2 text-neutral-100">
                                                    {prop.description || (
                                                        <span className="italic text-xs">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-neutral-400 text-sm">
                                    No documented props.
                                </p>
                            )}
                        </div>
                    </section>


                </div>
            </div>
        </div>
    )
}

export default page


