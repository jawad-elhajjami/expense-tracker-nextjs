'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

interface CurrencyContextType {
    currency: string
    setCurrency: (currency: string) => void
    isLoading: boolean
}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: 'USD',
    setCurrency: () => {},
    isLoading: true
})

export const useCurrency = () => useContext(CurrencyContext)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState('USD')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Load currency from localStorage on mount
        const savedCurrency = localStorage.getItem('preferred-currency')
        if (savedCurrency) {
            setCurrency(savedCurrency)
        }
        // Add a small delay to prevent flash of loading state
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    const handleCurrencyChange = (newCurrency: string) => {
        setCurrency(newCurrency)
        localStorage.setItem('preferred-currency', newCurrency)
    }

    return (
        <CurrencyContext.Provider 
            value={{ 
                currency, 
                setCurrency: handleCurrencyChange,
                isLoading 
            }}
        >
            {isLoading ? <LoadingScreen /> : children}
        </CurrencyContext.Provider>
    )
} 