"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Loader from "@/components/Loader";

const CandidateResults = () => {
  const params = useParams() as { interviewId: string; candidateId: string };

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-interview"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/get-candidate-answers/${params.interviewId}/${params.candidateId}`
      );
      return data as {
        answers: {
          id: number;
          question: string;
          feedback: string;
          answer: string;
          rating: number;
        }[];
      };
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }
  return (
    <section className="mt-6 flex flex-col gap-y-6">
      {isLoading ? (
        <Loader size="lg" />
      ) : (
        <>
          <h1 className="text-2xl text-primary font-semibold text-center">
            Breakdown of Candidate&apos; answers
          </h1>

          <Accordion type="single" collapsible className="">
            {data?.answers &&
              data.answers.map((item, i) => {
                return (
                  <AccordionItem value={`item-${i}`} key={item.id}>
                    <AccordionTrigger className="text-justify">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-y-2">
                      <p className="text-primary">
                        <span className="font-semibold">Answer</span> :{" "}
                        {item.answer}
                      </p>
                      <p>
                        <span className="font-semibold">Rating</span> :{" "}
                        {item.rating}/10
                      </p>
                      <p className="text-justify text-rose-600">
                        <span className="font-semibold">Feedback</span> :{" "}
                        {item.feedback}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </>
      )}
    </section>
  );
};

export default CandidateResults;
