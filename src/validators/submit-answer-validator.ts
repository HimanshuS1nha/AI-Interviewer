import { z } from "zod";

export const submitAnswerValidator = z.object({
  interviewId: z
    .string({ required_error: "Invalid request" })
    .trim()
    .min(1, { message: "Invalid request" }),
  questionId: z
    .string({ required_error: "Invalid request" })
    .trim()
    .min(1, { message: "Invalid request" }),
  answer: z.string({ required_error: "Answer is required" }),
  questionNumber: z.number({ required_error: "Question number is required" }),
});
