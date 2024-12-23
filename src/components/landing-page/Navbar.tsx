import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-20 flex justify-between h-[8vh] items-center bg-white/75 border-b border-b-gray-200 px-44 backdrop-blur-lg">
      <BrandLogo />

      <div className="flex gap-x-8 items-center">
        <Link
          href={"/pricing"}
          className="hover:text-primary delay-100 transition-all text-sm text-gray-700 cursor-pointer"
        >
          Pricing
        </Link>
        <Link
          href={"/contact-us"}
          className="hover:text-primary delay-100 transition-all text-sm text-gray-700 cursor-pointer"
        >
          Contact Us
        </Link>

        <Button asChild>
          <Link href={"/login"}>
            <p>Login</p>
            <ArrowRight size={24} color="white" />
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
