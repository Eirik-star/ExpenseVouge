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
        <div className="text-xl font-semibold pt-3 pl-3">Recent Transactions: </div>
        <div className='w-full h-[48vh] lg:h-[65vh] overflow-y-scroll scroll-smooth mt-2 mb-20 lg:mb-0 rounded-2xl'>
         <ul className="flex flex-col items-center gap-[0.30rem] w-full overflow-hidden py-1">
            {
                transactions.length == 0 ? 
                <h1>No Transactions</h1> :
                transactions.map((transaction) => {
                    const { description, transactionAmount, transactionType, category, date, time, id } = transaction
                    return(
                        <div key={id} className='w-[97%] relative'>
                            <ul 
                                className='w-full hover:scale-[1.02] delay-50 bg-white ring-1 ring-slate-100 hover:ring-slate-300 focus:ring-black rounded-xl'
                                onClick={() => {
                                    const dropdown = document.querySelector(`#dropdown-${id}`);
                                    dropdown.classList.remove('hidden');
                                    
                                    setTimeout(() => {
                                        dropdown.classList.add('hidden');
                                    }, 1600);
                                }} 
                                >
                                <li className="w-full flex flex-row items-center gap-1 lg:gap-5 cursor-pointer border-none py-2 rounded-xl">
                                    <div className="w-[12%] flex flex-row items-center justify-center py-3">{transactionType === 'expense' ?  categoryIcons[category] : <CircleDollarSign /> }</div>
                                    <div className="w-[49%] lg:w-[80%] flex flex-col">
                                        <div className="text-md font-semibold">{description}</div>
                                        <div className="text-sm text-gray-600">{date} at {time}</div>
                                    </div>
                                    <div className="w-[17%] lg:w-[19%]">
                                        {
                                            transactionType === 'expense' ? <Badge className={'bg-red-400 w-fit text-xs'}>expense</Badge> : <Badge className={'bg-green-300 w-fit'}>income</Badge>
                                        }
                                    </div>
                                    <div className="w-[22%] lg:w-[25%] text-md font-semibold">{transactionType == 'expense' ? <span className='text-red-500'>- </span> : <span className='text-green-500'>+ </span>}₹{transactionAmount}</div>
                                </li>
                            </ul>
                            <ul className='absolute right-5 top-[-2px] lg:left-[500px] lg:top-[10px] bg-white hidden z-50 p-2 rounded-lg flex flex-col ring-2 ring-slate-100' id={`dropdown-${id}`}>
                                <li className='flex flex-row justify-between items-center px-2 py-1 cursor-pointer hover:bg-gray-400 rounded-lg' onClick={() => nav('/edit/'+id) }>
                                    <p>Edit</p> <Pencil height={15} />
                                </li>
                                <li className='flex flex-row justify-between items-center px-2 py-1 cursor-pointer hover:bg-red-500 rounded-lg' onClick={() => deleteTransaction(id)}>
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