"use client"
import Navbar from "@/app/component/components/Navbar";
import Sidebar from "@/app/component/components/Sidebar";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { CodeBlock } from "../ui/code-block";
import { Button } from "../ui/Button";
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
    code: string;
    description?: string;
    props?: ComponentProp[];
}

const components: ComponentMeta[] = [
  {
    name: "Button",
    slug: "button",
    description: "Button component with variants and sizes.",
    preview: (
      <div className="flex gap-3 flex-wrap items-center">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button size="sm">Small</Button>
      </div>
    ),
    code: `// button.tsx
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 hover:bg-gray-100",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export const Button = ({ className, variant, size, ...props }) => (
  <button
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
);`,
    props: [
      {
        name: "variant",
        type: `"default" | "outline"`,
        default: `"default"`,
        description: "Visual style of the button.",
      },
      {
        name: "size",
        type: `"sm" | "md"`,
        default: `"md"`,
        description: "Size of the button.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables the button.",
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
    description: "Simple card layout component.",
    preview: (
      <div className="w-64 rounded-lg border p-4 shadow-sm">
        <h3 className="font-semibold">Card Title</h3>
        <p className="text-sm text-gray-600">This is a card preview.</p>
      </div>
    ),
    code: `// card.tsx
export const Card = ({ children }) => (
  <div className="rounded-lg border p-4 shadow-sm">
    {children}
  </div>
);`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        description: "Content inside the card.",
      },
    ],
  },

  {
    name: "Input",
    slug: "input",
    description: "Styled input field.",
    preview: (
      <input
        type="text"
        placeholder="Enter text..."
        className="w-64 rounded-md border px-3 py-2 text-sm"
      />
    ),
    code: `// input.tsx
export const Input = (props) => (
  <input
    className="rounded-md border px-3 py-2 text-sm"
    {...props}
  />
);`,
    props: [
      {
        name: "type",
        type: "string",
        default: `"text"`,
        description: "Input type.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder text.",
      },
      {
        name: "value",
        type: "string",
        description: "Input value.",
      },
      {
        name: "onChange",
        type: "(e) => void",
        description: "Change handler.",
      },
    ],
  },

  {
    name: "Badge",
    slug: "badge",
    description: "Small badge component.",
    preview: (
      <div className="flex gap-2">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
          Success
        </span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
          Error
        </span>
      </div>
    ),
    code: `// badge.tsx
export const Badge = ({ children }) => (
  <span className="rounded-full px-3 py-1 text-sm">
    {children}
  </span>
);`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        description: "Badge content.",
      },
    ],
  },

  {
    name: "Alert",
    slug: "alert",
    description: "Alert message component.",
    preview: (
      <div className="w-72 rounded-md border-l-4 border-yellow-500 bg-yellow-50 p-4 text-sm text-yellow-800">
        ⚠️ This is an alert message
      </div>
    ),
    code: `// alert.tsx
export const Alert = ({ children }) => (
  <div className="border-l-4 bg-yellow-50 p-4">
    {children}
  </div>
);`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        description: "Alert message.",
      },
    ],
  },

  {
    name: "Avatar",
    slug: "avatar",
    description: "User avatar component.",
    preview: (
      <img
        src="https://i.pravatar.cc/80"
        alt="Avatar"
        className="h-12 w-12 rounded-full"
      />
    ),
    code: `// avatar.tsx
export const Avatar = ({ src, alt }) => (
  <img
    className="h-12 w-12 rounded-full"
    src={src}
    alt={alt}
  />
);`,
    props: [
      {
        name: "src",
        type: "string",
        description: "Image source URL.",
      },
      {
        name: "alt",
        type: "string",
        description: "Alt text for the image.",
      },
    ],
  },
];


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


