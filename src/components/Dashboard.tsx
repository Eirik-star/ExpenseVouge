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
              Income
            </CardTitle>  
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{income.toLocaleString()}</div>
          </CardContent>
        </div>
        <div className="text-[3rem] m-auto hidden lg:block">&#x1f4c8;</div>
      </Card>

      <Card className="card-2">
        <div className="w-full lg:w-auto">
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Balance
            </CardTitle>  
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-2xl font-bold text-center pr-9 lg:pr-0">₹{balance.toLocaleString()}</div>
          </CardContent>
        </div>
        <div className="text-[3rem] m-auto hidden w-0 lg:w-auto lg:block">&#128176;</div>
      </Card>

      <Card className="card-3">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expense
            </CardTitle>  
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{expense.toLocaleString()}</div>
          </CardContent>
        </div>
        <div className="text-[3rem] m-auto hidden lg:block">&#x1f4c9;</div>
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
        <div className="">
          <h1 className="ml-2 text-xl font-semibold">Major Expenses:</h1>
          <DonutChart/>
        </div>
        <div className="mt-7">
          <div className="flex flex-row items-center justify-between  mb-8">
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