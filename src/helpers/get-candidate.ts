import prisma from "@/lib/db";

export const getCandidate = async (email: string, interviewId: string) => {
  const candidate = await prisma.candidates.findFirst({
    where: {
      email,
      interviewId,
    },
  });

  return candidate;
};
