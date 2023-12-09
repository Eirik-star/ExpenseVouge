import { doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase-config'

//  //Edit Transaction

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Button
  } from "@/components/ui/button"
import { Input } from "./ui/input"
import { useRef } from 'react'
import { useTransactionOperations } from '../hooks/useTransactionOperations'
import { Pencil } from "lucide-react"

  
export default function EditTransaction(){
    const { addTransaction } = useTransactionOperations()
    const descriptionRef = useRef(null)
    const transactionAmountRef = useRef(null)
    const transactionTypeRef = useRef(null)

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const description = descriptionRef.current?.value || '';
        const transactionAmount = parseFloat(transactionAmountRef.current?.value || '0');
        const transactionType = transactionTypeRef.current?.value || 'expense';
        
        const transactionData = {
            description,
            transactionAmount,
            transactionType,
        };
    
        // Assuming you have the document ID for the transaction
        const transactionDocId = 'your_transaction_document_id';
    
        try {
            await updateDoc(doc(db, 'transactions', transactionDocId), transactionData);
    
            // Reset the form fields
            if (descriptionRef.current) descriptionRef.current.value = '';
            if (transactionAmountRef.current) transactionAmountRef.current.value = '';
    
            console.log('Transaction updated successfully!');
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    return(
    <Dialog>
        <DialogTrigger className="flex flex-row justify-around items-center">
            <p>Edit</p> <Pencil height={15} />
        </DialogTrigger>
        <DialogContent className="bg-white border-2 border-black">
            <DialogHeader>
            <DialogTitle>Edit Transaction.</DialogTitle>
            <DialogDescription>
                Edit Transaction here. Click save when you're done.
            </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5 items-center" onSubmit={onSubmit}>
                <div className="w-[90%] flex flex-col gap-2 items-center">
                <Input 
                type="text" 
                className="w-[85%] border border-black focus:border-2" 
                placeholder="Description" 
                required 
                ref={descriptionRef}  
                />
                <Input 
                type="number" 
                className="w-[85%] border border-black focus:border-2" 
                placeholder="₹ Amount" 
                required 
                ref={transactionAmountRef} 
                />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                        <input 
                        type="radio" 
                        id="income" 
                        value="income" 
                        className="accent-black" 
                        name="transactionType"
                        ref={transactionTypeRef}
                        />
                        <label htmlFor="income">Income</label>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input 
                        type="radio" 
                        id="expense" 
                        value="expense" 
                        className="accent-black" 
                        name="transactionType"
                        ref={transactionTypeRef} 
                        defaultChecked
                        />
                        <label htmlFor="expense">Expense</label>
                    </div>
                </div>
                <Button onClick={onSubmit} onSubmit={onSubmit} className="bg-black text-white hover:bg-gray-900">Add Transaction</Button>
            </div>
        </DialogContent>
    </Dialog>
    )
}