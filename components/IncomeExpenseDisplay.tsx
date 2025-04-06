'use client'

import { formatAmount } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";

interface IncomeExpenseDisplayProps {
    initialIncome: number;
    initialExpense: number;
}

const IncomeExpenseDisplay = ({ initialIncome, initialExpense }: IncomeExpenseDisplayProps) => {
    const { currency, isLoading } = useCurrency();

    if (isLoading) {
        return (
            <div className="inc-exp-container">
                <div>
                    <h4>Income</h4>
                    <p className="money plus text-gray-400">Loading...</p>
                </div>
                <div>
                    <h4>Expense</h4>
                    <p className="money minus text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">
                    {formatAmount(initialIncome, currency)}
                </p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">
                    {formatAmount(initialExpense, currency)}
                </p>
            </div>
        </div>
    );
}

export default IncomeExpenseDisplay; 