import { model } from "@/lib/gemini";

export const getFeedback = async (
  question: string,
  answer: string,
  jobTitle: string,
  jobDescription: string | null,
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
      `You are an interviewer interviewing a candidate for the job having title ${jobTitle}, description ${jobDescription} and tech stack ${techStack} with a required experience of ${experience} number of years. You asked "${question}" question to the candidate to which he responded as "${answer}". Rate the answer of the candidate from 0 to 10 and also provide relevant feedback if any. Respond in the following format {rating:number;feedback:string}. Only respond in the specified format.`
    );

  return JSON.parse(response.response.text()) as {
    rating: number;
    feedback: string;
  };
};
