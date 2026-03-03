'use client';

import { CardTransaction } from './card-transaction/card-transaction';
import Link from 'next/link';

import s from './_transactions.module.scss';
import { useTransactions } from '@/hooks/use-transactions';
import { useLoading } from '@/hooks/use-loading';
import { Skeleton } from '@/components/ui/loading/skeleton-pulse/skeleton-pulse';

export const Transactions = () => {
  const { allTransactions } = useTransactions();
  const loading = useLoading(true, 1000);

  return (
    <div className={s.transactions__wrapper}>
      <div className={s.transactions__header}>
        <strong>Transações</strong>
        <Link href={'/transacoes'} className={s.link__more}>
          Ver mais
        </Link>
      </div>
      <div className={s.transactions__list}>
        {loading ? (
          <div className={s.bars__loading}>
            <Skeleton type="title" width={'100%'} />
            <Skeleton type="title" width={'100%'} />
          </div>
        ) : (
          allTransactions?.map((transaction) => (
            <CardTransaction key={transaction.id} transaction={transaction} />
          ))
        )}

        {}

        {allTransactions.length === 0 && !loading && (
          <span className={s.transactions__empty}>
            Nenhuma transação encontrada
          </span>
        )}
      </div>
    </div>
  );
};
