import DonutChart from "@/components/DonutChart"
import { Graph } from "@/components/Graph"
import Navbar from "@/components/Navbar"


function chart() {
  return (
    <div className="h-screen w-screen bg-[FAFAFA]">
      <h1 className="ml-10 pt-10 font-semibold text-2xl">Your Spending Summary: </h1>
      <div className="flex flex-col gap-16">
        <DonutChart />
        <Graph />
      </div>
      <Navbar />
    </div>
  )
}

export default chart
