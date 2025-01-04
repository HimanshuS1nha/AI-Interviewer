"use client";

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

const CreateInterviewDialog = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
            <Input placeholder="Enter job title" id="jobTitle" required />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="jobDescription">
              Job Description
            </Label>
            <Textarea
              placeholder="Enter job description"
              id="jobDescription"
              required
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1" htmlFor="techStack">
              Tech Stack{" "}
              <span className="text-xs text-rose-600">
                (separate by commas)
              </span>
            </Label>
            <Input placeholder="Enter tech stack" id="techStack" required />
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
            />
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
            />
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
            />
          </div>

          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInterviewDialog;
