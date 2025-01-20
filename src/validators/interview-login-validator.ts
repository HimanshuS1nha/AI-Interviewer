import { z } from "zod";

export const interviewLoginValidatorServer = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" }),
  interviewId: z
    .string({ required_error: "Invalid request" })
    .trim()
    .min(1, { message: "Invalid request" }),
});

export const interviewLoginValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  otp: z
    .string({ required_error: "OTP is required" })
    .trim()
    .length(6, { message: "OTP must be 6 characters long" }),
});

export type interviewLoginValidatorType = z.infer<
  typeof interviewLoginValidator
>;
