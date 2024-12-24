import Image from "next/image";

import BrandLogo from "@/components/BrandLogo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-[100dvh] flex">
      <div className="w-[75%] h-full relative">
        <Image
          src="/auth-img.webp"
          alt="Interview"
          className="object-cover"
          fill
        />
      </div>

      <div className="w-[25%] flex flex-col justify-between items-center  py-4 bg-white shadow-md shadow-black">
        <BrandLogo />

        {children}
      </div>
    </div>
  );
}
