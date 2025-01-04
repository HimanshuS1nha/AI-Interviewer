"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  createCompanyInterviewValidator,
  type createCompanyInterviewValidatorType,
} from "@/validators/create-company-interview-validator";

const CreateInterviewDialog = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<createCompanyInterviewValidatorType>({
    defaultValues: {
      candidatesEmails: [],
      experience: "",
      jobDescription: "",
      jobTitle: "",
      techStack: "",
      time: "",
    },
    resolver: zodResolver(createCompanyInterviewValidator),
  });

  return (
    <Dialog open={isVisible} onOpenChange={() => setIsVisible((prev) => !prev)}>
      <DialogContent className="max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Interview</DialogTitle>
          <DialogDescription>Click create when you are done.</DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="jobTitle">
              Job Title
            </Label>
            <Input
              placeholder="Enter job title"
              id="jobTitle"
              required
              {...register("jobTitle", { required: true })}
            />
            {errors.jobTitle && (
              <p className="text-sm text-rose-600">{errors.jobTitle.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="jobDescription">
              Job Description
            </Label>
            <Textarea
              placeholder="Enter job description"
              id="jobDescription"
              required
              {...register("jobDescription", { required: true })}
            />
            {errors.jobDescription && (
              <p className="text-sm text-rose-600">
                {errors.jobDescription.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="techStack">
              Tech Stack{" "}
              <span className="text-xs text-rose-600">
                (separate by commas)
              </span>
            </Label>
            <Input
              placeholder="Enter tech stack"
              id="techStack"
              required
              {...register("techStack", { required: true })}
            />
            {errors.techStack && (
              <p className="text-sm text-rose-600">
                {errors.techStack.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="experience">
              Required Experience{" "}
              <span className="text-xs text-rose-600">(in years)</span>
            </Label>
            <Input
              placeholder="Enter experience"
              type="number"
              id="experience"
              required
              {...register("experience", { required: true })}
            />
            {errors.experience && (
              <p className="text-sm text-rose-600">
                {errors.experience.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="time">
              Total Time{" "}
              <span className="text-xs text-rose-600">(in hours)</span>
            </Label>
            <Input
              placeholder="Enter total time"
              type="number"
              id="time"
              required
              {...register("time", { required: true })}
            />
            {errors.time && (
              <p className="text-sm text-rose-600">{errors.time.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="candidatesEmails">
              Candidates&apos; Emails{" "}
              <span className="text-xs text-rose-600">
                (separate by commas)
              </span>
            </Label>
            <Textarea
              placeholder="Enter candidates' emails"
              id="candidatesEmails"
              required
              onChange={(e) =>
                setValue(
                  "candidatesEmails",
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
            />
            {errors.candidatesEmails && (
              <p className="text-sm text-rose-600">
                {errors.candidatesEmails.message}
              </p>
            )}
          </div>

          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInterviewDialog;
