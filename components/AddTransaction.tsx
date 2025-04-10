"use client"

import addTransaction from "@/app/actions/addTransaction";
import {toast} from 'react-toastify'
import { useRef } from "react";
import {InformationCircleIcon} from "@heroicons/react/24/outline";
const AddTransaction = () => {

    const formRef = useRef<HTMLFormElement>(null);

    const clientAction = async (formData: FormData) => {
        const result = await addTransaction(formData);

        if(result.error){
            toast.error(result.error)
        }else{
            toast.success('Transaction added');
            formRef.current?.reset();
        }
    }
    return ( <>
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
            <h3 className="text-gray-900 text-xl font-semibold">Add transaction</h3>
            <form ref={formRef} action={ clientAction }>
                <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" id="text" name="text" placeholder="Enter text..." />
            </div>
            <div className="form-control">
                <label htmlFor="amount">
                    Amount <br />
                    <p className="flex gap-2 items-center text-sm">
                        <InformationCircleIcon className="h-6 w-6 text-gray-500" />
                        To add income insert postive value, to add expense insert negative value.
                    </p>
                </label>
                <input type="number" id="amount" name="amount" placeholder="Enter amount..." step="0.01"/>
            </div>
            <button className="bg-green-500 p-4 rounded-lg w-full text-white font-bold mt-4 hover:bg-green-600 duration-200 cursor-pointer">Add transaction</button>
            </form>
        </div>
    </> );
}
 
export default AddTransaction;