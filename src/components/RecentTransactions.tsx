import { useGetTransactions } from '../hooks/useGetTransactions'
import { useTransactionOperations } from '../hooks/useTransactionOperations'
import { Carrot, CircleDollarSign, Pencil, Trash2, Utensils, Clapperboard, HeartPulse, BookOpenText, Lightbulb, HelpCircle, CalendarPlus, BusFront, ScrollText } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

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

export default function RecentTransactions(){
    const { transactions } = useGetTransactions()
    const { deleteTransaction } = useTransactionOperations()
    const nav = useNavigate()
    return(
        <>
        <div className="text-xl font-semibold">Recent Transactions: </div>
        <div className='w-full h-[60vh] overflow-y-scroll scroll-smooth mt-3 mb-20 lg:mb-0 rounded-2xl'>
         <ul className="flex flex-col items-center gap-1 w-full overflow-hidden">
            {
                transactions.map((transaction) => {
                    const { description, transactionAmount, transactionType, category, date, time, id } = transaction
                    return(
                        <div key={id} className='w-[97%] relative'>
                            <ul 
                                className='w-full hover:scale-[1.02] delay-50 hover:ring-1 hover:ring-slate-300 focus:ring-black hover:rounded-xl'
                                onClick={() => {
                                    const dropdown = document.querySelector(`#dropdown-${id}`);
                                    dropdown.classList.remove('hidden');
                                    
                                    setTimeout(() => {
                                        dropdown.classList.add('hidden');
                                    }, 1600);
                                }} 
                                >
                                <li className="w-full lg:w-[95%] flex flex-row items-center gap-1 lg:gap-5 cursor-pointer border-none bg-white py-2 rounded-xl">
                                    <div className="w-[12%] flex flex-row items-center justify-center py-3">{transactionType === 'expense' ?  categoryIcons[category] : <CircleDollarSign /> }</div>
                                    <div className="w-[47%] flex flex-col">
                                        <div className="text-md font-semibold">{description}</div>
                                        <div className="text-sm text-gray-600">{date} at {time}</div>
                                    </div>
                                    <div className="w-[19%]">
                                        {
                                            transactionType === 'expense' ? <Badge className={'bg-red-400 w-fit text-xs'}>expense</Badge> : <Badge className={'bg-green-300 w-fit'}>income</Badge>
                                        }
                                    </div>
                                    <div className="w-[22%] text-md font-semibold">{transactionType == 'expense' ? <span className='text-red-500'>-</span> : <span className='text-green-500'>+</span>}₹{transactionAmount}</div>
                                </li>
                            </ul>
                            <ul className='absolute left-44 lg:left-[500px] lg:top-[10px] bg-white hidden z-50 p-2 rounded-lg flex flex-col ring-2 ring-slate-100' id={`dropdown-${id}`}>
                                <li className='flex flex-row justify-between items-center p-2 cursor-pointer hover:bg-gray-400 rounded-lg' onClick={() => nav('/edit/'+id) }>
                                    <p>Edit</p> <Pencil height={15} />
                                </li>
                                <li className='flex flex-row justify-between items-center p-2 cursor-pointer hover:bg-red-500 rounded-lg' onClick={() => deleteTransaction(id)}>
                                    <p>Delete</p> <Trash2 height={15} />
                                </li>
                            </ul>
                        </div>
                    )
                })
            }
         </ul>
        </div>
        </>
    )
}