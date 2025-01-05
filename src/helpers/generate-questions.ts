import { model } from "@/lib/gemini";

export const generateQuestions = async (
  jobTitle: string,
  jobDescription: string,
  techStack: string,
  experience: number
) => {
  const response = await model
    .startChat({
      generationConfig: {
        responseMimeType: "application/json",
      },
    })
    .sendMessage(
      `You are an interviewer interviewing a candidate for the job having title ${jobTitle}, description ${jobDescription} and tech stack ${techStack} with a required experience of ${experience} number of years. Generate 5 questions for the interview in the following format : string[]. Only respond in the specified format`
    );

  return JSON.parse(response.response.text()) as string[];
};
