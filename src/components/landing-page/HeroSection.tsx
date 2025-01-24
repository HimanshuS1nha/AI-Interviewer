import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import Title from "@/components/landing-page/Title";

const HeroSection = () => {
  return (
    <div className="h-[92vh] flex flex-col items-center justify-center gap-y-8 px-3">
      <div className="flex flex-col items-center gap-y-6">
        <Title
          tagline="Streamline hiring with AI-driven interviews"
          title="Enhance your hiring with efficient AI-powered interviews"
        />
        <p className="text-center max-w-3xl text-gray-700">
          Get detailed candidate evaluations with AI-powered technical
          interviews. Quickly assess skills, identify top talent, and make
          confident hiring decisions, all backed by data-driven insights.
        </p>
      </div>

      <div className="flex flex-col gap-y-6">
        <Link
          href={"/signup"}
          className="group relative flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white bg-primary px-8 font-medium text-white hover:ring-2 hover:ring-primary hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 h-14 w-60 text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <span className="flex items-center gap-x-2">
            <p>Start for free Today</p>
            <ArrowRight
              color="white"
              size={24}
              className="shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]"
            />
          </span>

          <div className="ease-&lsqb;[cubic-bezier(0.19,1,0.22,1)]&rsqb; absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
        </Link>

        <div className="flex flex-col items-center gap-y-1.5">
          <div className="flex gap-x-0.5 items-center">
            <Star fill="blue" size={17} className="text-transparent" />
            <Star fill="blue" size={17} className="text-transparent" />
            <Star fill="blue" size={17} className="text-transparent" />
            <Star fill="blue" size={17} className="text-transparent" />
            <Star fill="blue" size={17} className="text-transparent" />
          </div>
          <p className="text-sm text-gray-700">
            join <span className="font-semibold">1.000+</span> Individuals &
            Businesses
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
