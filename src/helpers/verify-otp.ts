import prisma from "@/lib/db";

export const verifyOtp = async (email: string, otp: number) => {
  const otpEntry = await prisma.otp.findUnique({
    where: {
      userEmail: email,
      otp,
    },
  });
  if (!otpEntry || otpEntry.expires < new Date()) {
    return false;
  }

  await prisma.otp.deleteMany({
    where: {
      userEmail: email,
    },
  });

  return true;
};
