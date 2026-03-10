'use client';

import s from './_filters.module.scss';
import { useState } from 'react';
import { useTransactions } from '@/hooks/use-transactions';
import { FilterIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const ModalFilter = dynamic(
  () => import('./modal-filter/modal-filter').then((mod) => mod.ModalFilter),
  { ssr: false },
);

export const Filters = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedMethodPayment,
    setSelectedMethodPayment,
  } = useTransactions();
  const [isOpenModalFilter, setIsOpenModalFilter] = useState<boolean>(false);
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempMethodPayment, setTempMethodPayment] = useState(
    selectedMethodPayment,
  );

  const handleOpenModal = () => {
    setTempCategory(selectedCategory);
    setTempMethodPayment(selectedMethodPayment);
    setIsOpenModalFilter(true);
  };

  const handleClearFilters = () => {
    setTempCategory('');
    setTempMethodPayment('');
  };

  const handleConfirmFilter = () => {
    setSelectedCategory(tempCategory);
    setSelectedMethodPayment(tempMethodPayment);
    setIsOpenModalFilter(false);
  };

  const quantity = selectedCategory || selectedMethodPayment ? 1 : 0;

  return (
    <>
      <button
        type="button"
        className={s.button__filter}
        onClick={handleOpenModal}
      >
        <FilterIcon size={16} color="#ffffff" />
        Filtros
        {quantity > 0 && <span className={s.quantity}></span>}
      </button>

      {isOpenModalFilter && (
        <ModalFilter
          selectedCategory={tempCategory}
          setSelectedCategory={setTempCategory}
          selectedMethodPayment={tempMethodPayment}
          setSelectedMethodPayment={setTempMethodPayment}
          onClose={() => setIsOpenModalFilter(false)}
          onClear={handleClearFilters}
          onConfirm={handleConfirmFilter}
        />
      )}
    </>
  );
};
