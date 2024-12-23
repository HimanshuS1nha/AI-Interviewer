import Link from "next/link";
import { Bot } from "lucide-react";

const BrandLogo = () => {
  return (
    <Link href={"/"} className="flex gap-x-2 items-center">
      <div className="bg-primary p-1 rounded-full">
        <Bot color="white" size={25} />
      </div>
      <p className="text-primary font-bold">AI Interviewer</p>
    </Link>
  );
};

export default BrandLogo;
