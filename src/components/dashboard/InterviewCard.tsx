import Link from "next/link";
import { Clipboard, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

import type { InterviewType } from "../../../types";

const InterviewCard = ({ interview }: { interview: InterviewType }) => {
  return (
    <div className="border border-gray-300 w-[98%] sm:w-[410px] rounded-lg py-3 px-6 flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-primary">{interview.jobTitle}</p>
          <Button
            variant={"ghost"}
            className="text-black hover:text-destructive delay-100 transition-all"
          >
            <Trash2 size={20} />
          </Button>
        </div>
        <p className="text-justify font-medium">
          <span className="font-semibold">{interview.experience}</span> years of
          experience
        </p>
        <p className="text-justify text-sm text-gray-700">
          Created 10 days ago
        </p>
      </div>

      {interview.status === "COMPLETE" ? (
        <Button className="w-full" variant={"secondary"} asChild>
          <Link href={`/dashboard/interviews/${interview.id}/results`}>
            Results
          </Link>
        </Button>
      ) : interview.status !== "ONGOING" ? (
        <div className="flex gap-x-2 items-center">
          <Button
            variant={"outline"}
            className="text-emerald-600 hover:bg-transparent hover:text-emerald-600 font-semibold cursor-auto w-[90%]"
          >
            Ongoing
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_URL}/interview/${interview.id}/start`
              );
              toast.success("Interview link copied");
            }}
          >
            <Clipboard size={20} />
          </Button>
        </div>
      ) : (
        <Button className="w-full">Start interview</Button>
      )}
    </div>
  );
};

export default InterviewCard;
