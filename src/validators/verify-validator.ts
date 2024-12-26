import { z } from "zod";

export const verifyValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is invalid" }),
  otp: z.number({ required_error: "OTP is required" }),
});
