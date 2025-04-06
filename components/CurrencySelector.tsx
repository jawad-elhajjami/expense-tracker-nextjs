'use client'

import { useCurrency } from '@/context/CurrencyContext'

const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'MAD', symbol: 'DH', name: 'Moroccan Dirham' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
]

const CurrencySelector = () => {
    const { currency, setCurrency, isLoading } = useCurrency()

    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600">
                    Currency:
                </label>
                <div className="h-10 w-24 bg-gray-100 rounded-lg animate-pulse" />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="currency" className="text-sm font-medium text-gray-600">
                Currency:
            </label>
            <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
                {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                        {curr.code} ({curr.symbol})
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CurrencySelector

// Export currencies for use in other components
export { currencies } 