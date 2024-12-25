import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/dashboard/InterviewCard";

const Interviews = () => {
  const dummyInterviews = [
    {
      jobTitle: "React Interview",
      experience: 5,
      status: "ongoing",
    },
    {
      jobTitle: "React Native Interview",
      experience: 2,
      status: "complete",
    },
    {
      jobTitle: "Java Interview",
      experience: 8,
      status: "not_started",
    },
  ];
  return (
    <section className="mt-6 flex flex-col gap-y-6">
      <div className="flex gap-x-4">
        <Input placeholder="Search by job title..." />
        <Button>New Interview</Button>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        {dummyInterviews.map((interview) => {
          return (
            <InterviewCard interview={interview} key={interview.jobTitle} />
          );
        })}
      </div>
    </section>
  );
};

export default Interviews;
