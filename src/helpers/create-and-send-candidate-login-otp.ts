import "server-only";

import { generate } from "otp-generator";

import prisma from "@/lib/db";
import { sendEmail } from "@/lib/send-email";

export const createAndSendCandidateLoginOtp = async (
  candidateId: string,
  candidateEmail: string
) => {
  const otp = parseInt(
    generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    })
  );

  await prisma.candidateLoginOtp.deleteMany({
    where: {
      candidateId,
    },
  });

  await prisma.candidateLoginOtp.create({
    data: {
      candidateId,
      otp,
      expires: new Date(Date.now() + 1000 * 60 * 5),
    },
  });

  await sendEmail(candidateEmail, otp);
};
