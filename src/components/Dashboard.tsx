import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useGetTransactions } from "../hooks/useGetTransactions"
import RecentTransactions from '../components/RecentTransactions'
import { Graph } from "./Graph"
import DonutChart from "./DonutChart"
import { useMedia } from "@/hooks/useMedia"

const Title = () => {
  return(
    <div className="title">
      <h1 className="title_text">ExpenseVouge &#129297;</h1>
    </div>
  )
}

const Balance = () => {
  const { transactionTotals } = useGetTransactions()
  const { income, expense, balance } = transactionTotals

  return(
    <div className="balance">
      <Card className="card-1">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Income <span className="text-emerald-500 font-bold lg:hidden">△</span> 
            </CardTitle>  
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{income.toLocaleString()}</div>
          </CardContent>
        </div>
        <div className="text-[3rem] m-auto hidden lg:block text-emerald-400">△</div>
      </Card>

      <Card className="card-2">
        <div className="w-full lg:w-auto">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white lg:text-black">
              Balance  <span className="text-indigo-400 font-thin text-lg lg:hidden">~</span>
            </CardTitle>  
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-2xl font-bold text-center pr-9 lg:pr-0 text-white lg:text-black">₹{balance.toLocaleString()}</div>
          </CardContent>
        </div>
        <div className="text-[3rem] m-auto hidden w-0 lg:w-auto lg:block text-indigo-400">~</div>
      </Card>

      <Card className="card-3">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expense <span className="text-red-500 font-bold lg:hidden">▽</span>
            </CardTitle>  
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{expense.toLocaleString()}</div>
          </CardContent>
        </div>
        <div className="text-[3rem] m-auto hidden lg:block text-red-400">▽</div>
      </Card>
    </div>
  )
}


export default function Dashboard(){
  const { isDesktop } = useMedia()
  return (
    <>
    <Title />
    <div className="dashboard">
      <section className="left-cont">
        <Balance />
        <RecentTransactions />
      </section>
      {
        isDesktop && 
        <section className="right-cont">
        <div className="ring-1 ring-slate-200 pt-4 rounded-xl bg-white">
          <h1 className="ml-5 text-xl font-semibold">Major Expenses:</h1>
          <DonutChart/>
        </div>
        <div className="mt-4 ring-1 ring-slate-200 rounded-xl bg-white">
          <div className="flex flex-row items-center justify-between  mb-7 ml-5 pt-4">
            <h1 className="text-xl font-semibold">Your Spending Summary:</h1>
          </div>
          <Graph/>
        </div>
      </section>
      }
    </div>
    </>
  )
}