import Link from "next/link";

import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

const InterviewCompleted = () => {
  return (
    <section className="w-full h-[100dvh] flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[30%] py-7 rounded-xl flex flex-col justify-center items-center gap-y-7 shadow shadow-gray-500">
        <BrandLogo />

        <div className="flex flex-col gap-y-3 items-center">
          <p className="text-emerald-600 text-lg font-semibold">
            Your interview has been submitted
          </p>

          <p className="text-sm">Thank you for taking the interview</p>
        </div>

        <Button asChild>
          <Link href={"/"} replace>
            Go to Home
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default InterviewCompleted;
