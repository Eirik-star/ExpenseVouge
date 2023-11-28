import DonutChart from "@/components/DonutChart"
import Navbar from "@/components/Navbar"


function chart() {
  return (
    <div className="h-screen w-screen bg-rose-100">
      <h1 className="ml-10 pt-10 font-semibold text-2xl">Your Spending Summary: </h1>
      <DonutChart />
      <Navbar />
    </div>
  )
}

export default chart
