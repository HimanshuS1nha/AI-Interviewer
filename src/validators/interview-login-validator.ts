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

export const interviewLoginValidatorClient = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

export type interviewLoginValidatorClientType = z.infer<
  typeof interviewLoginValidatorClient
>;
