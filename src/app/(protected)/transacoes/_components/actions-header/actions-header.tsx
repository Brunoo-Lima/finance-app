'use client';

import { useTransactions } from '@/hooks/use-transactions';
import { AddButtonExport } from './add-button-export';
import { AddButtonTransaction } from './add-button-transaction';

export const ActionsHeader = () => {
  const { paginatedData } = useTransactions();

  return (
    <>
      <AddButtonExport data={paginatedData} />
      <AddButtonTransaction />
    </>
  );
};
