import Script from "next/script";

import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/landing-page/Navbar";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    </>
  );
}
