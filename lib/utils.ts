import { currencies } from '@/components/CurrencySelector'

export const addCommas = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatAmount = (amount: number, currencyCode: string): string => {
    const currency = currencies.find(c => c.code === currencyCode) || currencies[0]
    const formattedNumber = addCommas(Math.abs(amount))
    
    // Special formatting for JPY and other currencies that don't typically use decimals
    if (currency.code === 'JPY' || currency.code === 'CNY') {
        return `${currency.symbol} ${Math.round(amount)}`
    }
    
    // Format with 2 decimal places for other currencies
    return `${currency.symbol} ${formattedNumber}`
}