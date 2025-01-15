"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

import {
  interviewLoginValidatorClient,
  type interviewLoginValidatorClientType,
} from "@/validators/interview-login-validator";

const InterviewLogin = () => {
  const router = useRouter();
  const params = useParams() as { interviewId: string };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<interviewLoginValidatorClientType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(interviewLoginValidatorClient),
  });

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: interviewLoginValidatorClientType) => {
      const { data } = await axios.post(`/api/interview-login`, {
        ...values,
        interviewId: params.interviewId,
      });

      return data as { message: string };
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      reset();
      router.replace(`/interview/${params.interviewId}/start`);
    },
    onError: async (error) => {
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
            onSubmit={handleSubmit((data) => handleLogin(data))}
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
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="password" className="ml-1">
                Password
              </Label>
              <Input
                placeholder="Enter your password"
                type="password"
                id="password"
                required
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-rose-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Please wait..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InterviewLogin;
