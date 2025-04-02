'use server'

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { cache } from 'react'

export const getUserBalance = cache(async (): Promise<number> => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const transactions = await db.transaction.findMany({
    where: { userId }
  });

  const balance = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return balance;
});
