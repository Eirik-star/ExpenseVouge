import { Graph } from "@/components/Graph"
import Navbar from "@/components/Navbar"

export default function bar(){
    return(
        <>
          <h1 className="ml-10 mb-16 pt-10 font-semibold text-2xl">Your Spending Summary: </h1>
          <Graph />
          <Navbar />
        </>
    )
}