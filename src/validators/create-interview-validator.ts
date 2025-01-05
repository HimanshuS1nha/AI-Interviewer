import { z } from "zod";

export const createInterviewValidator = z.object({
  jobTitle: z
    .string({ required_error: "Job title is required" })
    .trim()
    .min(1, { message: "Job title is required" }),
  jobDescription: z
    .string({ required_error: "Job description is required" })
    .trim()
    .min(1, { message: "Job description is required" }),
  techStack: z
    .string({ required_error: "Tech Stack is required" })
    .trim()
    .min(1, { message: "Tech Stack is required" }),
  experience: z
    .string({ required_error: "Experience is required" })
    .trim()
    .min(1, { message: "Experience is required" }),
  time: z
    .string({ required_error: "Total time is required" })
    .trim()
    .min(1, { message: "Total time is required" }),
  candidatesEmails: z
    .array(z.string())
    .min(1, { message: "Add atleast one candidate email" }),
});

export type createInterviewValidatorType = z.infer<
  typeof createInterviewValidator
>;
