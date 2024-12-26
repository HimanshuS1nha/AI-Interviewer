import "server-only";

import prisma from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  return user;
};
