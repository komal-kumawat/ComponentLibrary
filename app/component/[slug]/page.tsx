"use client"
import Navbar from "@/app/component/components/Navbar";
import Sidebar from "@/app/component/components/Sidebar";
import Button from "../ui/Button";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { BiCodeBlock } from "react-icons/bi";
import CodeBlock from "../components/CodeBlock";
interface ComponentProp {
    name: string;
    type: string;
    default?: string;
    description?: string;
}

interface ComponentMeta {
    name: string;
    slug: string;
    preview?: React.ReactNode;
    code?: string;
    description?: string;
    props?: ComponentProp[];
}

const components: ComponentMeta[] = [
    {
        name: "Button",
        slug: "button",
        description: "Button component with  variants and size.",
        preview: (
      <div className="flex gap-3 flex-wrap items-center">
        <Button>Default</Button>
      </div>
      
        ),
        code: `// button.tsx\nimport { cva } from "class-variance-authority";\nimport { cn } from "./utils";\n\nconst buttonVariants = cva(\n  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none",\n  {\n    variants: {\n      variant: {\n        default: "bg-blue-600 text-white hover:bg-blue-700",\n        outline: "border border-gray-300 hover:bg-gray-100",\n      },\n      size: {\n        sm: "px-3 py-1.5 text-sm",\n        md: "px-4 py-2 text-base",\n      },\n    },\n    defaultVariants: { variant: "default", size: "md" },\n  }\n);\n\nexport const Button = ({ className, variant, size, ...props }) => (\n  <button className={cn(buttonVariants({ variant, size }), className)} {...props} />\n);`,
        props: [
            {
                name: "variant",
                type: '"default" | "outline"',
                default: '"default"',
                description: "Visual style of the button.",
            },
            {
                name: "size",
                type: '"default" | "sm"',
                default: '"default"',
                description: "Size of the button.",
            },
            {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Disable the button.",
            },
            {
                name: "className",
                type: "string",
                description: "Additional CSS classes.",
            },
            {
                name: "children",
                type: "React.ReactNode",
                description: "Button content.",
            },
        ],
    },
    {
        name: "Card",
        slug: "card",
        description: "card component"
    }
    ,{
        name: "Input",
        slug: "input",
        description: "Input component"
    }

]
const page = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params);
    const comp = components.find(c => c.slug === slug);
    if (!comp) {
        notFound;
    }
    const [copied, setCopied] = useState(false);
    const [activeComp , setActiveComp] = useState("Button");

    useEffect(()=>{
        setActiveComp(comp?.name);
    } , [slug])

    const handleCopy = async () => {
        await navigator.clipboard.writeText(comp.code);
        setCopied(true);

        setTimeout(() => setCopied(false), 1500);
    };


    return (
        <div className='min-h-screen border-1 border-gray-800 border-y-0 flex flex-col text-neutral-200'>
            <Navbar />
            <div className='flex mt-10 h-[calc(100vh-20px)]'>
                <div className='hidden md:flex md:w-[30%] lg:w-[20%]  h-full overflow-y-auto'>
                    <Sidebar  activeComp={activeComp} setActiveComp={setActiveComp} sidebarComp={components}/>


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
                        <CodeBlock code={comp?.code} />
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


