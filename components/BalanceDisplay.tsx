'use client'

import { formatAmount } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";

interface BalanceDisplayProps {
    initialBalance: number;
}

const BalanceDisplay = ({ initialBalance }: BalanceDisplayProps) => {
    const { currency, isLoading } = useCurrency();
    const sign = initialBalance < 0 ? '-' : '';

    if (isLoading) {
        return (
            <>
                <h4 className="text-gray-500">Your balance</h4>
                <h1 className="font-bold text-2xl text-gray-400">Loading...</h1>
            </>
        );
    }

    return (
        <>
            <h4 className="text-gray-500">Your balance</h4>
            <h1 className={`font-bold text-2xl ${initialBalance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {sign}{formatAmount(Math.abs(initialBalance), currency)}
            </h1>
        </>
    );
}

export default BalanceDisplay; 