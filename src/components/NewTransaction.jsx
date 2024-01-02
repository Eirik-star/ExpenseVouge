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
import { useRef, useState } from 'react'
import { useTransactionOperations } from '../hooks/useTransactionOperations'
import { PenSquare, Plus } from "lucide-react"
import { useToast } from "./ui/use-toast"

  
export default function NewTransaction(){
    const { addTransaction } = useTransactionOperations()
    const descriptionRef = useRef(null)
    const transactionAmountRef = useRef(null)
    const incomeRef = useRef(null)
    const expenseRef = useRef(null)
    const [selectedOption, setSelectedOption] = useState('')
    const [showSelect, setShowSelect] = useState(true)
    const { toast } = useToast()


    const handleRadioChange = (e) => {
        setShowSelect(e.target.value === 'expense');
      };

      const options = [
        'Groceries',
        'Utilities',
        'Entertainment',
        'Education',
        'Health',
        'Food',
        'Bills',
        'Subscriptions',
        'Transport',
        'Misc',
      ];

      const handleSelectChange = (e) => {
        setSelectedOption(e.target.value)
      };
    
    const onSubmit = (e) => {
        e.preventDefault();
        const description = descriptionRef.current?.value || ''
        const transactionAmount = parseFloat(transactionAmountRef.current?.value || '0')
        const transactionType = incomeRef.current?.checked ? 'income' : 'expense'
        const category = selectedOption
        
        if (!description || isNaN(transactionAmount)) {
            return;
        }
        addTransaction({
            description,
            transactionAmount,
            transactionType,
            category,
            });
        
            if (descriptionRef.current) descriptionRef.current.value = ''
            if (transactionAmountRef.current) transactionAmountRef.current.value = ''
            if (incomeRef.current) incomeRef.current.checked = false
            if (expenseRef.current) expenseRef.current.checked = true
    }

    return(
    <Dialog>
        <DialogTrigger className="w-full items-center justify-evenly bg-rose-400 px- py-2 rounded-lg font-semibold text-sm cursor-pointer hover:bg-rose-500 border-2 border-black hidden lg:flex">
            <PenSquare height={40} /> <span>Add Transaction</span>
        </DialogTrigger>
        <DialogTrigger className="flex items-center justify-center w-14 h-14 bg-indigo-500 rounded-full lg:hidden">
            <Plus size={28} stroke="white" />
        </DialogTrigger>
        <DialogContent className="bg-white border-2 border-black">
            <DialogHeader>
            <DialogTitle>New Transaction.</DialogTitle>
            <DialogDescription>
                Add a New Transaction here. Click save when you're done.
            </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-5 items-center" onSubmit={onSubmit}>
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
                        id="expense" 
                        value="expense" 
                        className="accent-black" 
                        name="transactionType"
                        onChange={handleRadioChange}
                        ref={expenseRef}
                        defaultChecked
                        />
                        <label htmlFor="expense">Expense</label>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input 
                        type="radio" 
                        id="income" 
                        value="income" 
                        className="accent-black" 
                        name="transactionType"
                        ref={incomeRef}
                        onChange={handleRadioChange}
                        />
                        <label htmlFor="income">Income</label>
                    </div>
                </div>
                <div>
                    {
                        showSelect && (
                            <select defaultValue={'DEFAULT'} className="border border-black rounded-md px-2" onChange={handleSelectChange}>
                                <option value={'DEFAULT'} disabled>Choose a Category </option>
                                {options.map((option) => (
                                <option key={option} value={option}>
                                {option}
                                </option>
                                ))}
                            </select>
                        )
                    }
                </div>
                <Button type="submit"
                onClick={() => {
                    toast({
                        variant: "add",
                        title: "Transaction Added:",
                        description: descriptionRef.current?.value,
                    })
                    setShowSelect(true)
                }} 
                className="bg-black text-white hover:bg-gray-900">Add Transaction</Button>
            </form>
        </DialogContent>
    </Dialog>
    )
}
