import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, LabelList } from "recharts"
import { useGetDayTotals } from "@/hooks/useGetDayTotals"
import { useMedia } from "@/hooks/useMedia"

export function Graph() {
  const { expenseTotals, datesInRange } = useGetDayTotals()
  const {isDesktop } = useMedia()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const data=[]
  for(let i =0; i<days.length; i++){
    data.push(
      {
        name: days[datesInRange[i].getDay()],
        total: expenseTotals[i],
      }
    )
  }

  return (
    <ResponsiveContainer width="100%" height={ !isDesktop ? 550 : 250 }>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#g3g22"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#242d4"
          fontSize={12}
          tickFormatter={(value) => `₹${value.toLocaleString()}`}
          tickLine={false}
          axisLine={false}
        />
        <Bar dataKey="total" fill="#e11d48" radius={[3, 3, 0, 0]} >
          <LabelList
          dataKey="total"
          position="insideTop" 
          fontSize={10}
          fill="#fff"
          formatter={(value) => {
            if(value > 0) return `₹${value.toLocaleString()}`
            else return null
          }}
        />
      </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}