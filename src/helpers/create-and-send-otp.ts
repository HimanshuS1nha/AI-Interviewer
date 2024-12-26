import "server-only";

import { generate } from "otp-generator";

import prisma from "@/lib/db";
import { sendEmail } from "@/lib/send-email";

export const createAndSendOtp = async (email: string) => {
  const otp = parseInt(
    generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    })
  );

  await prisma.otp.deleteMany({
    where: {
      userEmail: email,
    },
  });

  await prisma.otp.create({
    data: {
      userEmail: email,
      otp,
      expiresIn: new Date(Date.now() + 1000 * 60 * 5),
    },
  });

  await sendEmail(email, otp);
};
