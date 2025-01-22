"use client";

import { useState, useEffect, Suspense } from "react";
import toast from "react-hot-toast";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import Questions from "@/components/interview/Questions";
import EditAnswerDialog from "@/components/interview/EditAnswerDialog";

import { submitAnswerValidator } from "@/validators/submit-answer-validator";

const UserVideo = dynamic(() => import("@/components/interview/UserVideo"), {
  ssr: false,
});

import type { QuestionType } from "../../../../../types";

const InterviewStart = () => {
  const router = useRouter();
  const params = useParams() as { interviewId: string };
  const searchParams = useSearchParams();
  const questionNumber = searchParams.get("question")
    ? parseInt(searchParams.get("question")!)
    : 1;

  const [isMicrophoneAccessGiven, setIsMicrophoneAccessGiven] = useState(false);
  const [question, setQuestion] = useState<QuestionType>();
  const [answer, setAnswer] = useState("");
  const [isEditAnswerDialogVisible, setIsEditAnswerDialogVisible] =
    useState(false);

  const { data, error } = useQuery({
    queryKey: [`get-question-${params.interviewId}-${questionNumber}`],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/interview/${params.interviewId}/get-question/${questionNumber}`
      );

      return data as { question: QuestionType };
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }

  const { mutate: handleSubmitAnswer, isPending } = useMutation({
    mutationKey: ["submit-interview"],
    mutationFn: async () => {
      if (!question) {
        throw new Error("Question not found");
      }

      const parsedData = await submitAnswerValidator.parseAsync({
        interviewId: params.interviewId,
        answer,
        questionNumber,
        questionId: question?.id,
      });

      const { data } = await axios.post("/api/submit-interview/candidate", {
        ...parsedData,
      });

      return data as { message: string; isInterviewComplete: boolean };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      if (data.isInterviewComplete) {
        router.replace(`/interview/${params.interviewId}/completed`);
      } else {
        router.replace(
          `/interview/${params.interviewId}/start?question=${
            questionNumber + 1
          }`
        );
      }
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof AxiosError && error.response?.data.error) {
        if (
          error.response.status === 409 &&
          error.response.data.questionNumber
        ) {
          router.replace(
            `/interview/${params.interviewId}/start?question=${error.response.data.questionNumber}`
          );
        } else if (error.response.status === 403) {
          router.replace(`/interview/${params.interviewId}/login`);
        }
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });

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

  useEffect(() => {
    if (error && error instanceof AxiosError && error.response) {
      if (error.response.status === 409 && error.response.data.questionNumber) {
        router.replace(
          `/interview/${params.interviewId}/start?question=${error.response.data.questionNumber}`
        );
      } else if (error.response.status === 403) {
        router.replace(`/interview/${params.interviewId}/login`);
      }
    }
  }, [error]);
  return (
    <section className="flex flex-col gap-y-6">
      {isMicrophoneAccessGiven ? (
        <>
          <EditAnswerDialog
            answer={answer}
            setAnswer={setAnswer}
            isVisible={isEditAnswerDialogVisible}
            setIsVisible={setIsEditAnswerDialogVisible}
          />
          <div className="flex justify-between items-center">
            <div />
            <h1 className="text-2xl text-primary font-semibold text-center">
              React.js Interview
            </h1>
            <Button
              variant={"destructive"}
              disabled={isPending}
              onClick={() => handleSubmitAnswer()}
            >
              Submit Answer
            </Button>
          </div>

          {question && (
            <div className="flex w-full h-full gap-x-3">
              <Questions activeQuestion={questionNumber} question={question} />

              <UserVideo setAnswer={setAnswer} answer={answer} />
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
