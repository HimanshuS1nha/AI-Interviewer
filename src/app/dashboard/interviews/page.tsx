"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/dashboard/InterviewCard";
import CreateInterviewDialog from "@/components/dashboard/CreateInterviewDialog";
import Loader from "@/components/Loader";

import type { InterviewType } from "../../../../types";

const Interviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [interviews, setInterviews] = useState<InterviewType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInterviews = interviews.filter((interview) => {
    if (searchQuery === "") {
      return true;
    } else {
      return interview.jobTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-interviews"],
    queryFn: async () => {
      const { data } = await axios.get("/api/get-interviews");
      return data as { interviews: InterviewType[] };
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }

  useEffect(() => {
    if (data?.interviews) {
      setInterviews(data.interviews);
    }
  }, [data]);
  return (
    <section className="mt-6 flex flex-col gap-y-6">
      <CreateInterviewDialog
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <div className="flex gap-x-4">
        <Input
          placeholder="Search by job title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => setIsVisible(true)}>New Interview</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader size="lg" />
        </div>
      ) : interviews.length > 0 ? (
        <div className="flex gap-4 items-center flex-wrap">
          {interviews.map((interview) => {
            return <InterviewCard interview={interview} key={interview.id} />;
          })}
        </div>
      ) : (
        <p className="text-rose-500 font-bold text-sm">No data to show</p>
      )}
    </section>
  );
};

export default Interviews;
