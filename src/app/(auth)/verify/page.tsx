"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { verifyValidator } from "@/validators/verify-validator";

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");

  const { mutate: handleVerify, isPending: verifyPending } = useMutation({
    mutationKey: ["verify"],
    mutationFn: async () => {
      const parsedData = await verifyValidator.parseAsync({
        otp: parseInt(otp),
        email,
      });

      const { data } = await axios.post(`/api/verify`, {
        ...parsedData,
      });

      return data as { message: string };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setOtp("");
      router.replace(`/login`);
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof AxiosError && error.response?.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <>
      <form
        className="flex flex-col gap-y-7 w-[90%]"
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify();
        }}
      >
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
        <Button type="submit" disabled={verifyPending}>
          {verifyPending ? "Please wait..." : "Verify"}
        </Button>
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
