"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Questions from "@/components/interview/Questions";
import UserVideo from "@/components/interview/UserVideo";

const InterviewStart = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isMicrophoneAccessGiven, setIsMicrophoneAccessGiven] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsMicrophoneAccessGiven(true);
      })
      .catch(() => toast.error("Microphone permission is required"));
  }, []);
  return (
    <section className="flex flex-col gap-y-6 px-32">
      {isMicrophoneAccessGiven ? (
        <>
          <h1 className="text-2xl text-primary font-semibold text-center">
            React.js Interview
          </h1>

          <div className="flex w-full h-full gap-x-3">
            <Questions activeQuestion={activeQuestion} />

            <UserVideo />
          </div>
        </>
      ) : (
        <p className="text-center text-rose-600 font-bold">
          Microphone permission is required to proceed
        </p>
      )}
    </section>
  );
};

export default InterviewStart;
