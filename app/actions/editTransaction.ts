'use server';

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string;
}

async function editTransaction(transactionId: string, formData: FormData): Promise<TransactionResult> {
    const textValue = formData.get("text");
    const amountValue = formData.get("amount");

    // check for input values
    if (!textValue || textValue === '' || !amountValue) {
        return { error: 'Text or amount is missing' };
    }

    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString());

    // get logged in user
    const { userId } = await auth();

    // Check for user
    if (!userId) {
        return { error: 'User not found !' };
    }

    try {
        const transactionData: TransactionData = await db.transaction.update({
            where: {
                id: transactionId,
                userId
            },
            data: {
                text,
                amount
            }
        });

        revalidatePath('/');
        return { data: transactionData };
    } catch (error) {
        return { error: 'Transaction not updated !' };
    }
}

export default editTransaction; 