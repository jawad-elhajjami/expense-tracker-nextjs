'use client'

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrency } from '@/context/CurrencyContext';
import getAnalytics from '@/app/actions/getAnalytics';

type Period = 'week' | 'month' | 'year';

interface AnalyticsData {
    name: string;
    income: number;
    expenses: number;
}

const AnalyticsDashboard = () => {
    const [period, setPeriod] = useState<Period>('month');
    const [data, setData] = useState<AnalyticsData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { currency } = useCurrency();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result = await getAnalytics(period);
                if (result.error) {
                    setError(result.error);
                } else if (result.data) {
                    setData(result.data);
                }
            } catch (err) {
                setError('Failed to fetch analytics data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [period]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                    <p className="font-medium text-gray-700">{label}</p>
                    <p className="text-green-600">Income: {currency}{payload[0].value.toLocaleString()}</p>
                    <p className="text-red-600">Expenses: {currency}{payload[1].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
    const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
    const netSavings = totalIncome - totalExpenses;

    if (isLoading) {
        return (
            <div className="w-full">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Financial Analytics</h2>
                    <p className="text-gray-600">Loading your financial data...</p>
                </div>
                <div className="animate-pulse">
                    <div className="h-[400px] bg-gray-100 rounded-xl"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Financial Analytics</h2>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Financial Analytics</h2>
                <p className="text-gray-600">Track your income and expenses over time</p>
            </div>

            <div className="flex justify-end mb-6">
                <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
                    {(['week', 'month', 'year'] as Period[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                                ${period === p 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Income vs Expenses</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis 
                                    dataKey="name" 
                                    stroke="#6B7280"
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                />
                                <YAxis 
                                    stroke="#6B7280"
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#10B981"
                                    fillOpacity={1}
                                    fill="url(#incomeGradient)"
                                    strokeWidth={2}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#EF4444"
                                    fillOpacity={1}
                                    fill="url(#expensesGradient)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-600 font-medium">Total Income</p>
                            <p className="text-2xl font-bold text-green-700">
                                {currency}{totalIncome.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-600 font-medium">Total Expenses</p>
                            <p className="text-2xl font-bold text-red-700">
                                {currency}{totalExpenses.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-600 font-medium">Net Savings</p>
                            <p className="text-2xl font-bold text-blue-700">
                                {currency}{netSavings.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard; 