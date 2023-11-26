import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../../config/firebase-config'
import { Input } from "../../../components/ui/input"
import { useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { PencilLine } from "lucide-react";


export default function EditTransaction(){
    const { id } = useParams()
    const nav = useNavigate()
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
        const transactionDocId = id;
    
        try {
            await updateDoc(doc(db, 'transactions', transactionDocId), transactionData);
    
            // Reset the form fields
            if (descriptionRef.current) descriptionRef.current.value = '';
            if (transactionAmountRef.current) transactionAmountRef.current.value = '';
            nav('/')
            console.log('Transaction updated successfully!');
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    return(
    <div className="flex justify-center mt-[4.5rem]">
      <div className="flex flex-col gap-5 px-7 py-10 border-2 border-black rounded-2xl" onSubmit={onSubmit}>
        <div className="flex gap-3 items-center">
            <PencilLine height={22} /><p>Edit your Transaction here. Click save when done.</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
        <Input 
        type="text" 
        className="border border-black focus:border-2" 
        placeholder="Description" 
        required 
        ref={descriptionRef}  
        />
        <Input 
        type="number" 
        className="border border-black focus:border-2" 
        placeholder="₹ Amount" 
        required 
        ref={transactionAmountRef} 
        />
        </div>
        <div className="flex flex-col items-start pl-7">
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
        <div className="flex flex-row justify-end gap-4">
            <button onClick={onSubmit} onSubmit={onSubmit} className="bg-[#252525] text-white px-6 py-2 rounded-lg text-sm cursor-pointer border border-black">Save</button>
            <button onClick={() => nav(-1)} className="px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer border border-[#252525]">Cancel</button>
        </div>
      </div>
    </div>
    )
}