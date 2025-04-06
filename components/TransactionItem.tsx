'use client'

import { Transaction } from "@/types/Transaction";
import { addCommas } from "@/lib/utils";
import { toast } from 'react-toastify';
import deleteTransaction from "@/app/actions/deleteTransaction";
import editTransaction from "@/app/actions/editTransaction";
import { useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";

const TransactionItem = ({ transaction }: {transaction: Transaction}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(transaction.text);
    const [amount, setAmount] = useState(transaction.amount);
    const sign = transaction.amount < 0 ? '-' : '+';

    const handleDeleteTransaction = async (transactionId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this transaction ?');
        if(!confirmed) return;
        const {message, error} = await deleteTransaction(transactionId);
        if(error){
            toast.error(error)
        }
        toast.success(message);
    }

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', text);
        formData.append('amount', amount.toString());

        const { data, error } = await editTransaction(transaction.id, formData);
        
        if (error) {
            toast.error(error);
        } else {
            toast.success('Transaction updated successfully');
            setIsEditing(false);
        }
    }

    const handleCancel = () => {
        setText(transaction.text);
        setAmount(transaction.amount);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <li className={`${transaction.amount < 0 ? 'minus' : 'plus'} p-6`}>
                <form onSubmit={handleEditSubmit} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="text" className="block text-sm font-medium mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium mb-2">
                            Amount {amount >= 0 ? '(Income)' : '(Expense)'}
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button 
                            type="submit" 
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        >
                            Save Changes
                        </button>
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </li>
        );
    }

    return ( 
        <li className={ transaction.amount < 0 ? 'minus' : 'plus' }>
            <div className="transaction-item">
                <span className="font-medium">{transaction.text}</span>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{sign}${ addCommas(Math.abs(transaction.amount)) }</span>
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="edit-btn"
                        title="Edit transaction"
                    >
                        <PencilIcon className="h-4 w-4" />
                    </button>
                    <button 
                        onClick={() => handleDeleteTransaction(transaction.id)} 
                        className="delete-btn"
                        title="Delete transaction"
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </li>
    );
}
 
export default TransactionItem;