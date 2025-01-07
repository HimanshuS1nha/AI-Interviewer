"use client";

import { useState } from "react";

import Questions from "@/components/interview/Questions";
import UserVideo from "@/components/interview/UserVideo";

import type { QuestionType } from "../../../../../types";

const InterviewStart = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  return (
    <section className="flex flex-col gap-y-6 px-32">
      <h1 className="text-2xl text-primary font-semibold text-center">
        React.js Interview
      </h1>

      <div className="flex w-full h-full gap-x-3">
        <Questions activeQuestion={activeQuestion} />

        <UserVideo />
      </div>
    </section>
  );
};

export default InterviewStart;
