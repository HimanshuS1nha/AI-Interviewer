"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  emailValidator,
  type emailValidatorType,
} from "@/validators/email-validator";

const ForgotPassword = () => {
  const router = useRouter();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<emailValidatorType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailValidator),
  });

  const { mutate: handleForgotPassword, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: emailValidatorType) => {
      const { data } = await axios.post(`/api/forgot-password`, {
        ...values,
      });

      return data as { message: string };
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      router.replace(`/forgot-password/verify?email=${getValues("email")}`);
      reset();
    },
    onError: async (error) => {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast.error(error.response.data.error);
        if (error.response.status === 403) {
          router.push(`/verify?email=${getValues("email")}`);
        }
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <form
      className="flex flex-col gap-y-7 w-[98%] lg:w-[90%]"
      onSubmit={handleSubmit((data) => handleForgotPassword(data))}
    >
      <p className="text-primary text-xl font-semibold text-center">
        Forgot password
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

      <Button type="submit" disabled={isPending}>
        {isPending ? "Please wait..." : "Submit"}
      </Button>
    </form>
  );
};

export default ForgotPassword;
