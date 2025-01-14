"use client";

import { useState, useEffect, Suspense } from "react";
import toast from "react-hot-toast";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import Questions from "@/components/interview/Questions";
import UserVideo from "@/components/interview/UserVideo";

const InterviewStart = () => {
  const router = useRouter();
  const params = useParams() as { interviewId: string };
  const searchParams = useSearchParams();
  const questionNumber = searchParams.get("question")
    ? parseInt(searchParams.get("question")!)
    : 1;

  const [isMicrophoneAccessGiven, setIsMicrophoneAccessGiven] = useState(false);
  const [question, setQuestion] = useState<{ id: string; question: string }>();

  const { data, error } = useQuery({
    queryKey: [`get-question-${params.interviewId}-${questionNumber}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `/interview/${params.interviewId}/${questionNumber}`
      );

      return data as { question: { id: string; question: string } };
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.error(error.response.data.error);
      if (error.response.status === 409) {
        if (error.response.data.questionNumber) {
          router.replace(
            `/interview/${params.interviewId}/start?question=${error.response.data.questionNumber}`
          );
        }
      }
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setIsMicrophoneAccessGiven(true);
      })
      .catch(() => toast.error("Microphone permission is required"));
  }, []);

  useEffect(() => {
    if (data) {
      setQuestion(data.question);
    }
  }, [data]);
  return (
    <section className="flex flex-col gap-y-6 px-32">
      {isMicrophoneAccessGiven ? (
        <>
          <h1 className="text-2xl text-primary font-semibold text-center">
            React.js Interview
          </h1>

          {question && (
            <div className="flex w-full h-full gap-x-3">
              <Questions activeQuestion={questionNumber} />

              <UserVideo />
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-rose-600 font-bold">
          Microphone permission is required to proceed
        </p>
      )}
    </section>
  );
};

const InterviewStartPage = () => {
  return (
    <Suspense>
      <InterviewStart />
    </Suspense>
  );
};

export default InterviewStartPage;
