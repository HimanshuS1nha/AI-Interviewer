import BrandLogo from "@/components/BrandLogo";

const Footer = () => {
  return (
    <div className="flex flex-col gap-y-10 mt-20">
      <footer className="flex justify-between items-center px-28">
        <div className="flex flex-col gap-y-4 w-[25%]">
          <BrandLogo />
          <p className="text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae
            commodi dignissimos distinctio sunt, optio nobis. Dicta.
          </p>
        </div>
        <div className="flex flex-col gap-y-4 items-center">
          <p className="font-semibold">Quick Links</p>
          <div className="flex flex-col gap-y-2 items-center">
            <p className="hover:text-primary delay-100 transition-all cursor-pointer">
              Home
            </p>
            <p className="hover:text-primary delay-100 transition-all cursor-pointer">
              Pricing
            </p>
            <p className="hover:text-primary delay-100 transition-all cursor-pointer">
              Contact Us
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 items-center">
          <p className="font-semibold">Policies</p>
          <div className="flex flex-col gap-y-2 items-center">
            <p className="hover:text-primary delay-100 transition-all cursor-pointer">
              Terms and Conditions
            </p>
            <p className="hover:text-primary delay-100 transition-all cursor-pointer">
              Privacy Policy
            </p>
            <p className="hover:text-primary delay-100 transition-all cursor-pointer">
              Data Policy
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 items-center">
          <p className="font-semibold">Help and Support</p>
          <div className="flex flex-col gap-y-2 items-center">
            <p className="hover:text-primary delay-100 transition-all cursor-pointer">
              Support center
            </p>
            <p className="hover:text-primary delay-100 transition-all cursor-pointer">
              Live chat
            </p>
            <p className="hover:text-primary delay-100 transition-all cursor-pointer">
              Call center
            </p>
          </div>
        </div>
      </footer>

      <div className="flex justify-center items-center h-[5vh]">
        <p className="text-gray-700 text-sm">
          &copy; {new Date().getFullYear()} AI Interviewer. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
