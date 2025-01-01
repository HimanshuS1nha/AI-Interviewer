import Link from "next/link";

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}

      <div className="flex flex-col gap-y-4 items-center">
        <Link
          href={"/login"}
          className="text-primary font-medium hover:underline cursor-pointer"
        >
          Back to Login
        </Link>
        <p className="text-sm font-medium text-gray-700">
          By continuing, you agree to our{" "}
          <span className="font-medium">Terms and Conditions</span>
        </p>
      </div>
    </>
  );
}
