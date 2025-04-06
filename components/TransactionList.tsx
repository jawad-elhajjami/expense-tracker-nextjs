import { Transaction } from "@/types/Transaction";
import getTransactions from "@/app/actions/getTransactions";
import TransactionItem from "./TransactionItem";
import { Suspense } from "react";
import PaginationButtons from "./PaginationButtons";

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
            <PaginationButtons currentPage={page} totalPages={totalPages} />
        </Suspense>
    );
}
 
export default TransactionList;