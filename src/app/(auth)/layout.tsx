import Image from "next/image";

import BrandLogo from "@/components/BrandLogo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center bg-gray-100 lg:bg-white">
      <div className="hidden lg:block w-[65%] xl:w-[75%] h-full relative">
        <Image
          src="/auth-img.webp"
          alt="Interview"
          className="object-cover"
          fill
        />
      </div>

      <div className="w-[90%] md:w-[50%] lg:w-[35%] xl:w-[25%] lg:h-full max-h-[90%] lg:max-h-full flex flex-col gap-y-8 lg:justify-between items-center py-6 lg:py-4 px-4 lg:px-0 bg-white shadow-md shadow-black rounded-xl lg:rounded-none overflow-y-auto">
        <BrandLogo />

        {children}
      </div>
    </div>
  );
}
