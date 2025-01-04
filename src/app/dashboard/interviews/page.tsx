"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/dashboard/InterviewCard";
import CreateInterviewDialog from "@/components/dashboard/CreateInterviewDialog";

import type { InterviewType } from "../../../../types";

const Interviews = () => {
  const [isVisible, setIsVisible] = useState(false);

  const dummyInterviews: InterviewType[] = [
    {
      id: "1",
      jobTitle: "React Interview",
      experience: 5,
      status: "ongoing",
    },
    {
      id: "2",
      jobTitle: "React Native Interview",
      experience: 2,
      status: "complete",
    },
    {
      id: "3",
      jobTitle: "Java Interview",
      experience: 8,
      status: "not_started",
    },
  ];
  return (
    <section className="mt-6 flex flex-col gap-y-6">
      <CreateInterviewDialog
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <div className="flex gap-x-4">
        <Input placeholder="Search by job title..." />
        <Button onClick={() => setIsVisible(true)}>New Interview</Button>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        {dummyInterviews.map((interview) => {
          return <InterviewCard interview={interview} key={interview.id} />;
        })}
      </div>
    </section>
  );
};

export default Interviews;
