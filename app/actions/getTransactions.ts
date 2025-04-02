'use server'

import { db } from "@/lib/db"
import { Transaction } from "@/types/Transaction";
import { auth } from "@clerk/nextjs/server"

async function getTransactions(page: number, limit: number): Promise<{
    transactions?: Transaction[];
    totalCount?: number;
    currentPage?: number;
    error?: string;
}>{
    const { userId } = await auth();

    if(!userId){
        return {error: 'User not found !'}
    }
    
    try {
        
        const transactionsCount = await db.transaction.count({
            where: { userId }
        });
        const totalCount = Math.ceil(transactionsCount);

        const transactions = await db.transaction.findMany({
            skip:(page - 1) * limit,
            take: limit,
            where: {userId},
            orderBy: {
                createdAt: 'desc'
            }
        });
        return { 
            transactions,
            totalCount,
            currentPage: page, 
        };

    } catch (error) {
        return {error: "Database error !"}
    }
}
export default getTransactions;