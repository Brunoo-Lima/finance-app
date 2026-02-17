'use client';

import { Card } from '@/components/ui/card/card';
import {
  CalendarDaysIcon,
  DollarSignIcon,
  TargetIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { useGoals } from '@/hooks/use-goals';

export const StatsCards = () => {
  const { totalAchieved, totalOverall, totalContributionMonthly, allGoals } =
    useGoals();

  return (
    <>
      <Card
        icon={<TargetIcon size={16} color="#ffffff" />}
        backgroundIcon="#FFFFFF14"
        backgroundCustom="#ffffff1a"
        text="Metas ativas"
        value={allGoals.length || 0}
      />

      <Card
        icon={<DollarSignIcon size={16} color="#39BE00" />}
        backgroundIcon="#39BE0014"
        text="Total economizado"
        amount={totalAchieved}
      />

      <Card
        icon={<TrendingUpIcon size={16} color="#39BE00" />}
        backgroundIcon="#39BE0014"
        text="Total Geral"
        amount={totalOverall}
      />

      <Card
        icon={<CalendarDaysIcon size={16} color="#ffffff" />}
        backgroundIcon="#FFFFFF14"
        text="Contribuição Mensal"
        amount={totalContributionMonthly}
      />
    </>
  );
};
