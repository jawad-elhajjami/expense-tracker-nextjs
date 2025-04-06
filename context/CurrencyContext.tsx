'use client'

import { createContext, useContext, useEffect, useState } from 'react'

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
        setIsLoading(false)
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
            {!isLoading && children}
        </CurrencyContext.Provider>
    )
} 