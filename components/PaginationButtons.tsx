'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface PaginationButtonsProps {
    currentPage: number
    totalPages: number
}

const PaginationButtons = ({ currentPage, totalPages }: PaginationButtonsProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    // Reset loading state when the page parameter changes
    useEffect(() => {
        setIsLoading(false)
    }, [searchParams.get('page')])

    const handlePageChange = (newPage: number) => {
        setIsLoading(true)
        router.push(`?page=${newPage}`)
    }

    const renderPageNumbers = () => {
        const pages = []
        const showEllipsisStart = currentPage > 3
        const showEllipsisEnd = currentPage < totalPages - 2

        if (totalPages <= 5) {
            // If total pages is 5 or less, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (showEllipsisStart) {
                pages.push('...')
            }

            // Show pages around current page
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (!pages.includes(i)) {
                    pages.push(i)
                }
            }

            if (showEllipsisEnd) {
                pages.push('...')
            }

            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages)
            }
        }

        return pages
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isLoading || currentPage <= 1}
                className={`relative flex items-center justify-center bg-blue-500 text-white px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed min-w-[40px]`}
            >
                ←
            </button>

            {renderPageNumbers().map((page, index) => (
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2">
                        {page}
                    </span>
                ) : (
                    <button
                        key={`page-${page}`}
                        onClick={() => page !== currentPage && handlePageChange(page as number)}
                        disabled={isLoading || page === currentPage}
                        className={`relative flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-[40px] ${
                            page === currentPage
                                ? 'bg-blue-600 text-white cursor-default'
                                : 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                    >
                        {isLoading && page === currentPage ? (
                            <>
                                <span className="opacity-0">{page}</span>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </>
                        ) : (
                            page
                        )}
                    </button>
                )
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isLoading || currentPage >= totalPages}
                className={`relative flex items-center justify-center bg-blue-500 text-white px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed min-w-[40px]`}
            >
                →
            </button>
        </div>
    )
}

export default PaginationButtons 