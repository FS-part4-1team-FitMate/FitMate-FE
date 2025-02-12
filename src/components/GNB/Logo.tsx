import { logo_xl } from "@/imageExports";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link className="shrink-0" href="/">
      <Image className="h-auto" src={logo_xl} alt="Logo" width={96} height={32} />
    </Link>
  );
}

export default Logo;
