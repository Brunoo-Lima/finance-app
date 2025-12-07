import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface IData {
  name: string;
  value: number;
  fill: string;
  [key: string]: any;
}

interface PieChartSimpleProps {
  data: IData[];
  isAnimationActive?: boolean;
}

export default function PieChartSimple({
  isAnimationActive = true,
  data,
}: PieChartSimpleProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart style={{ zIndex: "-1" }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          innerRadius={100}
          paddingAngle={2}
          dataKey="value"
          isAnimationActive={isAnimationActive}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
