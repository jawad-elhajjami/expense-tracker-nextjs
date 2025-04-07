'use server'

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, eachDayOfInterval, eachMonthOfInterval, format, subMonths } from "date-fns"

type Period = 'week' | 'month' | 'year';

interface AnalyticsData {
    name: string;
    income: number;
    expenses: number;
}

async function getAnalytics(period: Period): Promise<{
    data?: AnalyticsData[];
    error?: string;
}> {
    const { userId } = await auth();

    if (!userId) {
        return { error: 'User not found!' }
    }

    try {
        const now = new Date();
        let startDate: Date;
        let endDate: Date;
        let interval: Date[];

        // Set the date range based on the period
        switch (period) {
            case 'week':
                startDate = startOfWeek(now);
                endDate = endOfWeek(now);
                interval = eachDayOfInterval({ start: startDate, end: endDate });
                break;
            case 'month':
                // For monthly view, show the last 6 months
                endDate = endOfMonth(now);
                startDate = startOfMonth(subMonths(now, 5)); // 6 months ago
                interval = eachMonthOfInterval({ start: startDate, end: endDate });
                break;
            case 'year':
                startDate = startOfYear(now);
                endDate = endOfYear(now);
                interval = eachMonthOfInterval({ start: startDate, end: endDate });
                break;
        }

        // Get all transactions within the date range
        const transactions = await db.transaction.findMany({
            where: {
                userId,
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        // Process the data based on the period
        const data = interval.map(date => {
            const periodTransactions = transactions.filter(tx => {
                const txDate = new Date(tx.createdAt);
                if (period === 'year' || period === 'month') {
                    return txDate.getMonth() === date.getMonth() && 
                           txDate.getFullYear() === date.getFullYear();
                }
                return txDate.toDateString() === date.toDateString();
            });

            const income = periodTransactions
                .filter(tx => tx.amount > 0)
                .reduce((sum, tx) => sum + tx.amount, 0);

            const expenses = Math.abs(periodTransactions
                .filter(tx => tx.amount < 0)
                .reduce((sum, tx) => sum + tx.amount, 0));

            return {
                name: period === 'year' || period === 'month' ? format(date, 'MMM') : format(date, 'EEE'),
                income,
                expenses
            };
        });

        return { data };

    } catch (error) {
        return { error: "Database error!" }
    }
}

export default getAnalytics; 