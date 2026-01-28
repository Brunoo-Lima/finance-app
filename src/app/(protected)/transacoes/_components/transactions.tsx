'use client';

import s from './_transactions.module.scss';
import { FilterIcon } from 'lucide-react';
import { useTransactions } from '@/hooks/use-transactions';
import { Pagination } from '@/components/ui/pagination/pagination';
import { Dropdown } from '@/components/ui/dropdown/dropdown';
import { InputSearch } from '@/components/ui/input/input-search/input-search';
import { Filters } from './filters/filters';
import dynamic from 'next/dynamic';
import Loading from '@/components/ui/loading/loading';
import Link from 'next/link';

const TableData = dynamic(
  () => import('./table-data/table-data').then((mod) => mod.TableData),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export const Transactions = () => {
  const {
    paginatedData,
    handlePageChange,
    totalPages,
    page,
    selectedTypeTransaction,
    setSelectedTypeTransaction,
    searchTerm,
    handleSearch,
  } = useTransactions();

  const isEmpty = paginatedData?.length === 0;

  return (
    <div className={s.transactions__wrapper}>
      <div className={s.header__transactions}>
        <InputSearch
          placeholder="Pesquisar transação"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className={s.filters__container}>
          <Dropdown
            classNameWrapper={s.dropdown__custom}
            options={[
              {
                label: 'Todas',
                value: '',
              },
              {
                label: 'Depósito',
                value: 'DEPOSIT',
              },
              {
                label: 'Despesa',
                value: 'EXPENSE',
              },
              {
                label: 'Investimento',
                value: 'INVESTMENT',
              },
            ]}
            icon={<FilterIcon size={16} color="#ffffff" />}
            value={selectedTypeTransaction}
            onChange={(e) => setSelectedTypeTransaction(e as any)}
            placeholder="Selecione"
          />

          <Filters />
        </div>
      </div>

      <Link href="/dashboard">Ir para dashboard</Link>

      <TableData data={paginatedData} isEmpty={isEmpty} />

      {!isEmpty && paginatedData.length > 7 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          marginLeft="auto"
        />
      )}
    </div>
  );
};
