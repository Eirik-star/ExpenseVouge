import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "./ui/card"

import { useGetTransactions } from "../hooks/useGetTransactions"
import RecentTransactions from '../components/RecentTransactions'
import { Graph } from "./Graph"
import DonutChart from "./DonutChart"

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
        <div className="text-[3rem] m-auto">&#x1f4c8;</div>
      </Card>

      <Card className="card-2">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Balance
            </CardTitle>  
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{balance.toLocaleString()}</div>
          </CardContent>
        </div>
        <div className="text-[3rem] m-auto">&#128176;</div>
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
        <div className="text-[3rem] m-auto">&#x1f4c9;</div>
      </Card>
    </div>
  )
}


export default function Dashboard(){
  return (
    <>
    <Title />
    <div className="dashboard">
      <section className="left-cont">
        <Balance />
        <RecentTransactions />
      </section>
      <section className="right-cont">
        <div className="">
          <h1 className="ml-2 pt-5 text-xl font-semibold">Major Expenses:</h1>
          <DonutChart/>
        </div>
        <div className="">
          <div className="flex flex-row items-center justify-between  mb-8">
            <h1 className="text-xl font-semibold">Your Spending Summary:</h1>
          </div>
          <Graph/>
        </div>
      </section>
    </div>
    </>
  )
}