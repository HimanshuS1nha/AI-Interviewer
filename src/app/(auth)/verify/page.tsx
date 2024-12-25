"use client";

// import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Verify = () => {
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");

  const [otp, setOtp] = useState("");

  return (
    <>
      <form className="flex flex-col gap-y-7 w-[90%]">
        <p className="text-primary text-xl font-semibold text-center">
          Verify your email
        </p>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1">OTP</Label>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="flex justify-end">
            <p className="text-sm hover:underline delay-100 transition-all cursor-pointer text-primary">
              Resend OTP
            </p>
          </div>
        </div>
        <Button type="submit">Verify</Button>
      </form>

      <Link
        href={"/login"}
        replace
        className="text-primary font-medium hover:underline cursor-pointer"
      >
        Back to Login
      </Link>
    </>
  );
};

const VerifyPage = () => {
  return (
    <Suspense>
      <Verify />
    </Suspense>
  );
};

export default VerifyPage;
