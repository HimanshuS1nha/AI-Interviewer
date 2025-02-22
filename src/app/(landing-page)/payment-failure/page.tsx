import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const PaymentFailure = () => {
  return (
    <section className="flex flex-col pt-10 pb-10 lg:pb-0 lg:h-[80vh] items-center">
      <div className="lg:w-[70%] h-full flex flex-col lg:flex-row justify-between items-center gap-y-10">
        <div className="flex flex-col gap-y-7 items-center lg:items-start">
          <div className="flex flex-col gap-y-4 items-center lg:items-start">
            <p className="text-3xl md:text-5xl font-bold text-rose-600 text-center">
              Payment Failed!
            </p>
            <p className="text-gray-700 text-justify w-[90%] text-sm">
              If you think this is a mistake on our part, please reach out to
              us.
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <Button variant={"destructive"} asChild>
              <Link href={"/contact-us"}>Contact Us</Link>
            </Button>
            <Button variant={"ghost"} asChild>
              <Link href={"/"}>Back to Home</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={"/failure-gif.gif"}
            alt="Success GIF"
            width={400}
            height={200}
            className="rounded-lg shadow shadow-gray-300 w-[90%] md:w-[400px]"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};

export default PaymentFailure;
