export type UserType = {
  id: string;
  name: string;
  email: string;
};

export type InterviewType = {
  id: string;
  jobTitle: string;
  experience: number;
  status: "NOT_STARTED" | "ONGOING" | "COMPLETE";
};

export type QuestionType = {
  id: string;
  question: string;
};
