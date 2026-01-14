'use client';

import { Card } from '@/components/ui/card/card';
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useTransactions } from '@/hooks/use-transactions';

export const StatsCards = () => {
  const { revenueBalance, expenseBalance, investmentBalance } =
    useTransactions();

  return (
    <>
      <Card
        text="Investido"
        amount={investmentBalance}
        icon={<PiggyBankIcon size={16} color="#ffffff" />}
        backgroundIcon="#FFFFFF14"
      />
      <Card
        text="Receita"
        amount={revenueBalance}
        icon={<TrendingUpIcon size={16} color="#39BE00" />}
        backgroundIcon="#39BE0014"
      />
      <Card
        text="Despesas"
        amount={expenseBalance}
        icon={<TrendingDownIcon size={16} color="#E93030" />}
        backgroundIcon="#F6352E14"
      />
    </>
  );
};
