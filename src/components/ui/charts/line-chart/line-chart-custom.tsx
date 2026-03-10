import { ITransaction } from '@/@types/ITransaction';
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import s from './_line-chart.module.scss';
import { formatCurrencyBR } from '@/utils/format-currency';

interface ILineChartCustomProps {
  data: ITransaction[];
  year?: number;
  filterMode?: 'general' | 'month';
  month?: number;
}

const MONTHS = [
  { key: '01', label: 'Jan' },
  { key: '02', label: 'Fev' },
  { key: '03', label: 'Mar' },
  { key: '04', label: 'Abr' },
  { key: '05', label: 'Mai' },
  { key: '06', label: 'Jun' },
  { key: '07', label: 'Jul' },
  { key: '08', label: 'Ago' },
  { key: '09', label: 'Set' },
  { key: '10', label: 'Out' },
  { key: '11', label: 'Nov' },
  { key: '12', label: 'Dez' },
];

const LineChartCustom = ({
  data,
  year = new Date().getFullYear(),
  filterMode = 'general',
  month = new Date().getMonth(),
}: ILineChartCustomProps) => {
  const processedData = useMemo(() => {
    if (filterMode === 'general') {
      const grouped = data.reduce<
        Record<string, { total: number; count: number }>
      >((acc, item) => {
        const date = new Date(item.date);
        if (date.getUTCFullYear() !== year) return acc;
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        acc[month] = {
          total: (acc[month]?.total || 0) + item.amount,
          count: (acc[month]?.count || 0) + 1,
        };
        return acc;
      }, {});

      return MONTHS.map(({ key, label }) => ({
        name: label,
        Transações: grouped[key]?.total ?? 0,
        count: grouped[key]?.count ?? 0,
      }));
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grouped = data.reduce<
      Record<number, { total: number; count: number }>
    >((acc, item) => {
      const date = new Date(item.date);
      if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month)
        return acc;

      const day = date.getUTCDate();
      acc[day] = {
        total: (acc[day]?.total || 0) + item.amount,
        count: (acc[day]?.count || 0) + 1,
      };
      return acc;
    }, {});

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return {
        name: String(day),
        Transações: grouped[day]?.total ?? 0,
        count: grouped[day]?.count ?? 0,
      };
    });
  }, [data, year, month, filterMode]);

  const valueFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
  });

  return (
    <LineChart
      width={700}
      height={433}
      data={processedData}
      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
      className={s.line__chart}
    >
      <XAxis dataKey="name" tickLine={false} />
      <YAxis width={80} tickFormatter={(v) => valueFormatted.format(v)} />
      <Tooltip content={<CustomTooltip />} />
      <Line
        type="monotone"
        dataKey="Transações"
        stroke="#60c830"
        activeDot={{ r: 4 }}
      />
    </LineChart>
  );
};

export default LineChartCustom;

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const itens = payload.map((item) => ({
      name: item.name,
      value: item.value,
      color: item.fill,
      count: item.payload.count,
    }));

    return (
      <div className={s.custom__tooltip}>
        <div className={s.custom__header}>{label}</div>

        <div className={s.custom__content}>
          {itens.map((item) => (
            <div key={item.name} className={s.custom__content__item}>
              <p>{item.count} transações</p>
              <span>{formatCurrencyBR(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
