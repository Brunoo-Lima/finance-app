'use client';

import { useTransactions } from '@/hooks/use-transactions';
import { AddButtonExport } from './add-button-export';
import { AddButtonTransaction } from './add-button-transaction';

export const ActionsHeader = () => {
  const { allTransactions } = useTransactions();

  return (
    <>
      <AddButtonExport data={allTransactions} />
      <AddButtonTransaction />
    </>
  );
};
