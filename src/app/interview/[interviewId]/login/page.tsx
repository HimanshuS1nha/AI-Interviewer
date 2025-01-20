"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ZodError } from "zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

import { emailValidator } from "@/validators/email-validator";
import {
  interviewLoginValidator,
  type interviewLoginValidatorType,
} from "@/validators/interview-login-validator";

const InterviewLogin = () => {
  const router = useRouter();
  const params = useParams() as { interviewId: string };

  const [isOtpGenerated, setIsOtpGenerated] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm<interviewLoginValidatorType>({
    defaultValues: {
      email: "",
      otp: "",
    },
    resolver: zodResolver(
      isOtpGenerated ? interviewLoginValidator : emailValidator
    ),
  });

  const { mutate: handleSendOtp, isPending: sendOtpPending } = useMutation({
    mutationKey: ["send-otp"],
    mutationFn: async () => {
      const parsedData = await emailValidator.parseAsync({
        email: getValues("email"),
      });

      const { data } = await axios.post(
        `/api/interview/${params.interviewId}/send-otp`,
        { ...parsedData }
      );

      return data as { message: string };
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      setIsOtpGenerated(true);
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

  const { mutate: handleLogin, isPending: loginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: interviewLoginValidatorType) => {
      const { data } = await axios.post(
        `/api/interview/${params.interviewId}/login`,
        {
          ...values,
        }
      );

      return data as { message: string };
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      reset();
      router.replace(`/interview/${params.interviewId}/start`);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <section className="w-full h-[100dvh] flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[30%] py-7 rounded-xl flex flex-col justify-center items-center gap-y-7 shadow shadow-gray-500">
        <BrandLogo />
        <div className="flex flex-col w-full px-7 gap-y-6">
          <div className="flex flex-col">
            <p className="font-bold text-lg">Login</p>
            <p className="text-sm text-gray-700">to start the interview</p>
          </div>

          <form
            className="flex flex-col gap-y-6"
            onSubmit={handleSubmit((data) => {
              if (isOtpGenerated) {
                handleLogin(data);
              } else {
                handleSendOtp();
              }
            })}
          >
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="email" className="ml-1">
                Email
              </Label>
              <Input
                placeholder="Enter your email"
                type="email"
                id="email"
                required
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-rose-600 text-sm">{errors.email.message}</p>
              )}
            </div>
            {isOtpGenerated && (
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="password" className="ml-1">
                  Password
                </Label>
                <InputOTP
                  maxLength={6}
                  value={getValues("otp")}
                  onChange={(value) => setValue("otp", value)}
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
                {errors.otp && (
                  <p className="text-rose-600 text-sm">{errors.otp.message}</p>
                )}
              </div>
            )}

            <Button type="submit" disabled={sendOtpPending || loginPending}>
              {loginPending || sendOtpPending
                ? "Please wait..."
                : isOtpGenerated
                ? "Login"
                : "Send OTP"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InterviewLogin;
