import { Transaction } from "@/types/Transaction";
import getTransactions from "@/app/actions/getTransactions";
import TransactionItem from "./TransactionItem";
import Link from 'next/link';
import { Suspense } from "react";

const TransactionList = async ({page, limit}: {page:number, limit:number}) => {
    
    const { transactions, totalCount, currentPage, error } = await getTransactions(page, limit); 
    const totalPages = Math.ceil((totalCount || 0) / limit);

    if(error){
        return <p className="error">{error}</p>
    }

    return ( 
        <Suspense fallback={<p>Loading...</p>}>
            <h3>History</h3>
            <ul className="list">
                { transactions &&
                    transactions.map((transaction: Transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    )) 
                }
            </ul>
            {/* Pagination */}
            <div className="flex items-center justify-center gap-4">
                {page > 1 && <Link className="block bg-blue-500 text-white p-4 rounded-lg" href={`?page=${page - 1}`}> Prev</Link>}
                {page < totalPages && <Link className="block bg-blue-500 text-white p-4 rounded-lg" href={`?page=${page + 1}`}>Next</Link>}
            </div>
        </Suspense>
    );
}
 
export default TransactionList;