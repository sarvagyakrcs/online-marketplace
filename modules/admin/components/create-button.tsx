import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function CreateProductButton({ href, Icon, title }: {
    href: string;
    Icon: LucideIcon | React.ElementType;
    title: string;
}) {
    return (
        <Link
            href={href}
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
        >
            <Icon className={cn("mx-auto size-10 text-gray-400")} />
            <span className="mt-2 block font-semibold text-gray-900">
                { title }
            </span>
        </Link>
    );
}
