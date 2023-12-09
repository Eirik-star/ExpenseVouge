import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useGetCategoryTotals } from '../hooks/useGetCategoryTotals'
import { useMedia } from '@/hooks/useMedia';

const COLORS = [
                '#0088FE', 
                '#00C49F', 
                '#FFBB28',
                '#fe4a49',
                '#2ab7ca',
                '#f6abb6',
                '#03396c',
                '#651e3e',
                '#851e3e',
                '#f6cd61'
              ];

const DonutChart = () => {
  const { categories, categoryTotals } = useGetCategoryTotals()
  const { isDesktop } = useMedia()
  var data =[]
  for(let i=0; i<categories.length; i++){
    data.push(
      {name: categories[i], value: categoryTotals[i]}
    )
  }

  const filteredData = data.filter(item => item.value > 0)

  return (
    <>
      <ResponsiveContainer width="90%" height={ !isDesktop ? 300 : 255 }>
      <PieChart>
        <Pie
          data={filteredData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={!isDesktop ? 45 : 35}
          outerRadius={!isDesktop ? 80 : 80}
          fill="#252525"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend layout={!isDesktop ? "horizontal" : "vertical"} align={!isDesktop ? "center" : "right"} verticalAlign={!isDesktop ? "bottom" : "middle"} />
      </PieChart>
    </ResponsiveContainer>
    </>
  );
};

export default DonutChart;
