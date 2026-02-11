import { Card } from '@/components/ui/card/card';
import {
  CalendarDaysIcon,
  DollarSignIcon,
  TargetIcon,
  TrendingUpIcon,
} from 'lucide-react';
import s from './_stats.module.scss';

export const StatsCards = () => {
  return (
    <>
      <Card
        icon={<TargetIcon size={16} color="#ffffff" />}
        backgroundIcon="#FFFFFF14"
        backgroundCustom="#ffffff1a"
        text="Metas ativas"
        value={5}
      />

      <Card
        icon={<DollarSignIcon size={16} color="#39BE00" />}
        backgroundIcon="#39BE0014"
        text="Total economizado"
        amount={500}
      />

      <Card
        icon={<TrendingUpIcon size={16} color="#39BE00" />}
        backgroundIcon="#39BE0014"
        text="Objetivo Total"
        amount={2000}
      />

      <Card
        icon={<CalendarDaysIcon size={16} color="#ffffff" />}
        backgroundIcon="#FFFFFF14"
        text="Contribuição Mensal"
        amount={300}
      />
    </>
  );
};
