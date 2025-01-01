import { z } from "zod";

export const emailValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
});

export type emailValidatorType = z.infer<typeof emailValidator>;
