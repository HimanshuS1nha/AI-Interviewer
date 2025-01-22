"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EditAnswerDialog = ({
  answer,
  setAnswer,
  isVisible,
  setIsVisible,
}: {
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [updatedAnswer, setUpdatedAnswer] = useState(answer);

  const handleEditAnswer = () => {
    setAnswer(updatedAnswer);

    setUpdatedAnswer("");
    setIsVisible(false);
  };
  return (
    <Dialog open={isVisible} onOpenChange={() => setIsVisible((prev) => !prev)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Answer</DialogTitle>
          <DialogDescription>Click edit when done.</DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditAnswer();
          }}
        >
          <div className="flex flex-col gap-y-3">
            <Label htmlFor="answer" className="ml-1">
              Your answer
            </Label>
            <Textarea
              placeholder="Type your answer..."
              id="answer"
              value={updatedAnswer}
              onChange={(e) => setUpdatedAnswer(e.target.value)}
            />
          </div>
          <Button type="submit">Edit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAnswerDialog;
