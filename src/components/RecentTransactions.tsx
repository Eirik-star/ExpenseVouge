import { useGetTransactions } from '../hooks/useGetTransactions';
import { useTransactionOperations } from '../hooks/useTransactionOperations';

import { Carrot, CircleDollarSign, Pencil, Trash2, Utensils, Clapperboard, HeartPulse, BookOpenText, Lightbulb, HelpCircle, CalendarPlus, BusFront, ScrollText } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

 const categoryIcons = {
     'Groceries' : <Carrot />,
     'Utilities': <Lightbulb />,
     'Entertainment': <Clapperboard />,
     'Education': <BookOpenText />,
     'Health': <HeartPulse />,
     'Food': <Utensils />,
    'Bills': <ScrollText />,
    'Subscriptions': <CalendarPlus />,
    'Transport': <BusFront />,
    'Misc': <HelpCircle />,
  }

//   <CircleDollarSign color='#f44336' strokeWidth={2.3} height={30} width={33} />

export default function RecentTransactions(){
    const { transactions } = useGetTransactions()
    const { deleteTransaction } = useTransactionOperations()
    const nav = useNavigate()
    return(
        <div className='recent'>
        <div className="text-xl font-semibold">Recent Transactions: </div>
        <div className='w-full h-[60vh] overflow-y-scroll scroll-smooth mt-3 rounded-2xl'>
         <ul className="flex flex-col items-center gap-1 w-full overflow-hidden">
            {
                transactions.map((transaction) => {
                    const { description, transactionAmount, transactionType, category, date, time, id } = transaction
                    return(
                        <DropdownMenu key={id}>
                            <DropdownMenuTrigger asChild className='hover:scale-[1.02] delay-50 hover:ring-1 hover:ring-slate-300'>
                                <li className="w-[95%] flex flex-row items-center gap-5 cursor-pointer border-none bg-white py-1 rounded-xl">
                                    <div className="w-[10%] flex flex-row items-center justify-center py-3">{transactionType === 'expense' ?  categoryIcons[category] : <CircleDollarSign /> }</div>
                                    <div className="w-[54%] flex flex-col">
                                        <div className="text-md font-semibold">{description}</div>
                                        <div className="text-sm text-gray-600">{date} at {time}</div>
                                    </div>
                                    <div className="w-[18%]">
                                        {
                                            transactionType === 'expense' ? <Badge className={'bg-red-400 w-fit'}>expense</Badge> : <Badge className={'bg-green-300 w-fit'}>income</Badge>
                                        }
                                    </div>
                                    <div className="w-[18%] text-md font-semibold">{transactionType == 'expense' ? <span className='text-red-500'>-</span> : <span className='text-green-500'>+</span>}₹{transactionAmount}</div>
                                </li>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='absolute left-28 top-[-30px]'>
                            <DropdownMenuItem className='flex flex-row justify-between items-center px-3 cursor-pointer hover:bg-gray-400' onClick={() => nav('/edit/'+id) }>
                                <p>Edit</p> <Pencil height={15} />
                            </DropdownMenuItem>
                            <DropdownMenuItem className='flex flex-row justify-between items-center px-3 cursor-pointer hover:bg-red-500' onClick={() => deleteTransaction(id)}>
                                <p>Delete</p> <Trash2 height={15} />
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                })
            }
         </ul>
        </div>
        </div>
    )
}