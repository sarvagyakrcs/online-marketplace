import { PROJECT_NAME } from "@/metadata";
import Link from "next/link";

export function Logo({
  link
} : {
  link ?: string
}) {
  return (
    <Link href={link ?? "/"}>
      <span className="text-lg font-bold">{PROJECT_NAME.toLocaleUpperCase()}</span>
    </Link>
  );
}
