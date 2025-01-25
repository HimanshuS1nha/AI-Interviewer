"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  signupValidator,
  type signupValidatorType,
} from "@/validators/signup-validator";

const Signup = () => {
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<signupValidatorType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signupValidator),
  });

  const { mutate: handleSignup, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: signupValidatorType) => {
      const { data } = await axios.post(`/api/signup`, {
        ...values,
      });

      return data as { message: string };
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      router.push(`/verify?email=${getValues("email")}`);
      reset();
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
    <>
      <form
        className="flex flex-col gap-y-7 w-[98%] lg:w-[90%]"
        onSubmit={handleSubmit((data) => handleSignup(data))}
      >
        <p className="text-primary text-xl font-semibold text-center">
          Create an account
        </p>
        <div className="flex flex-col gap-y-3">
          <Label htmlFor="name" className="ml-1">
            Name
          </Label>
          <Input
            placeholder="Enter name of the company"
            type="name"
            id="name"
            required
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-rose-600 text-sm">{errors.name.message}</p>
          )}
        </div>
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
        </div>
        <div className="flex flex-col gap-y-3">
          <Label htmlFor="confirmPassword" className="ml-1">
            Confirm Password
          </Label>
          <Input
            placeholder="Confirm your password"
            type="password"
            id="confirmPassword"
            required
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="text-rose-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Please wait..." : "Signup"}
        </Button>
      </form>

      <div className="flex flex-col gap-y-4 items-center">
        <p>
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-primary font-medium hover:underline cursor-pointer"
          >
            Login
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

export default Signup;
