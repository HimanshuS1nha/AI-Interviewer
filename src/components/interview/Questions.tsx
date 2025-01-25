"use client";

import { Pencil, Volume2 } from "lucide-react";
import toast from "react-hot-toast";

import type { QuestionType } from "../../../types";

const Questions = ({
  activeQuestion,
  question,
  answer,
}: {
  activeQuestion: number;
  question: QuestionType;
  answer: string;
}) => {
  const speakQuestion = () => {
    if ("speechSynthesis" in window) {
      if (window.speechSynthesis.speaking) {
      } else {
        const speech = new SpeechSynthesisUtterance(question.question);
        window.speechSynthesis.speak(speech);
      }
    } else {
      toast.error("Your browser does not support text to speech");
    }
  };
  return (
    <div className="w-[98%] sm:w-[90%] lg:w-[60%] bg-gray-100 p-4 rounded-xl flex flex-col gap-y-6">
      <div className="flex gap-2 items-center flex-wrap">
        {[0, 1, 2, 3, 4].map((item) => {
          return (
            <div
              className={`${
                item === activeQuestion - 1 ? "bg-primary" : "bg-gray-300"
              } px-3 py-1.5 rounded-full`}
              key={item}
            >
              <p
                className={`text-sm font-medium ${
                  item === activeQuestion - 1 ? "text-white" : ""
                }`}
              >
                Question {item + 1}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex gap-x-2 items-end">
          <p className="font-semibold text-justify">
            Q{activeQuestion}. {question.question}
          </p>
          <Volume2
            size={26}
            className="text-black hover:text-primary delay-100 transition-all ml-1.5 cursor-pointer my-1 shrink-0"
            onClick={speakQuestion}
          />
        </div>
        <div className="flex gap-x-2 items-end">
          <p className="text-justify">Answer. {answer}</p>
          <Pencil
            size={24}
            className="text-black hover:text-primary delay-100 transition-all ml-1.5 cursor-pointer my-1 shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
