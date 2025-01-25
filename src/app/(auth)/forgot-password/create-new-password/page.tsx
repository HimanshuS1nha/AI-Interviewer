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
  createNewPasswordValidator,
  type createNewPasswordValidatorType,
} from "@/validators/create-new-password-validator";

const CreateNewPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createNewPasswordValidatorType>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(createNewPasswordValidator),
  });

  const { mutate: handleCreateNewPassword, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: createNewPasswordValidatorType) => {
      const { data } = await axios.post(
        `/api/forgot-password/create-new-password`,
        {
          ...values,
        }
      );

      return data as { message: string };
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      router.replace(`/login`);
      reset();
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
    <form
      className="flex flex-col gap-y-7 w-[98%] lg:w-[90%]"
      onSubmit={handleSubmit((data) => handleCreateNewPassword(data))}
    >
      <p className="text-primary text-xl font-semibold text-center">
        Create new password
      </p>

      <div className="flex flex-col gap-y-3">
        <Label htmlFor="newPassword" className="ml-1">
          New Password
        </Label>
        <Input
          placeholder="Enter new password"
          type="password"
          id="newPassword"
          required
          {...register("newPassword", { required: true })}
        />
        {errors.newPassword && (
          <p className="text-rose-600 text-sm">{errors.newPassword.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-3">
        <Label htmlFor="confirmPassword" className="ml-1">
          Confirm New Password
        </Label>
        <Input
          placeholder="Confirm new password"
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
        {isPending ? "Please wait..." : "Submit"}
      </Button>
    </form>
  );
};

export default CreateNewPassword;
