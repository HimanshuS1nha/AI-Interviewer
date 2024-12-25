"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useUser } from "@/hooks/useUser";

import {
  loginValidator,
  type loginValidatorType,
} from "@/validators/login-validator";

import type { UserType } from "../../../../types";

const Login = () => {
  const router = useRouter();
  const setUser = useUser((state) => state.setUser);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<loginValidatorType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidator),
  });

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: loginValidatorType) => {
      const { data } = await axios.post(`/api/login`, {
        ...values,
      });

      return data as { user: UserType; message: string };
    },
    onSuccess: async (data) => {
      setUser(data.user);
      toast.success(data.message);
      reset();
      router.replace(`/dashboard`);
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
    <>
      <form
        className="flex flex-col gap-y-7 w-[90%]"
        onSubmit={handleSubmit((data) => handleLogin(data))}
      >
        <p className="text-primary text-xl font-semibold text-center">
          Login to your account
        </p>

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
            <p className="text-rose-600 text-sm">{errors.password.message}</p>
          )}
          <div className="flex justify-end">
            <p className="text-sm text-primary hover:underline delay-100 transition-all cursor-pointer">
              Forgot Password?
            </p>
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Please wait..." : "Login"}
        </Button>
      </form>

      <div className="flex flex-col gap-y-4 items-center">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="text-primary font-medium hover:underline cursor-pointer"
          >
            Signup
          </Link>
        </p>
        <p className="text-sm font-medium text-gray-700">
          By continuing, you agree to our{" "}
          <span className="font-medium">Terms and Conditions</span>
        </p>
      </div>
    </>
  );
};

export default Login;
