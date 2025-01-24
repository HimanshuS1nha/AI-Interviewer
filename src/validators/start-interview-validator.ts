import { z } from "zod";

export const startInterviewValidator = z.object({
  interviewId: z
    .string({ required_error: "Invalid request" })
    .trim()
    .min(1, { message: "Invalid request" }),
});
