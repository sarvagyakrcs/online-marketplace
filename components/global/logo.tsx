import { PROJECT_NAME } from "@/metadata";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <span className="text-lg font-bold">{PROJECT_NAME.toLocaleUpperCase()}</span>
    </Link>
  );
}
