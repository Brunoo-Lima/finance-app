'use client';

import { ITransaction } from '@/@types/ITransaction';
import { TableRow } from './table-row';
import s from './_table.module.scss';
import { useState } from 'react';
import { FormUpsertTransaction } from '../form/form-upsert-transaction';
import { DialogDelete } from './dialog-delete/dialog-delete';
import { DialogSuccess } from '@/components/ui/dialog/dialog-success';
import { useModalState } from '@/hooks/use-modal-state';

export type IModalType = 'edit' | 'delete';
export type IActionType = 'edit' | 'delete';

interface ITableDataProps {
  data: ITransaction[];
  isEmpty?: boolean;
}

export const TableData = ({ data, isEmpty }: ITableDataProps) => {
  const {
    showSuccess,
    setShowSuccess,
    activeModal,
    setActiveModal,
    pendingAction,
    setPendingAction,
  } = useModalState<IModalType, IActionType>();

  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleEditTransaction = (transaction: ITransaction) => {
    setActiveModal('edit');
    setPendingAction('edit');
    setSelectedTransaction(transaction);
  };

  const handleConfirmDelete = (id: number) => {
    setSelectedDeleteId(id);
    setActiveModal('delete');
    setPendingAction('delete');
  };

  const handleDelete = () => {
    setActiveModal(null);
    setSelectedDeleteId(null);
    setShowSuccess(true);
  };

  const handleSave = () => {
    setShowSuccess(true);
    setActiveModal(null);
  };

  return (
    <>
      <div className={s.table__wrapper}>
        <table className={s.table__data}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Categoria</th>
              <th>Método</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <TableRow
                key={item.id}
                item={item}
                onEdit={() => handleEditTransaction(item)}
                onDelete={() => handleConfirmDelete(item.id)}
              />
            ))}
          </tbody>
        </table>

        {isEmpty && <p className={s.is__empty}>Não há transações</p>}
      </div>

      {activeModal === 'edit' && (
        <FormUpsertTransaction
          transaction={selectedTransaction}
          onClose={() => setActiveModal(null)}
          onSave={handleSave}
        />
      )}

      {activeModal === 'delete' && (
        <DialogDelete
          onConfirm={handleDelete}
          onClose={() => setActiveModal(null)}
        />
      )}

      {showSuccess && (
        <DialogSuccess
          title="Sucesso!"
          textButton="Continuar"
          description={
            pendingAction === 'edit'
              ? 'Transação editada com sucesso.'
              : 'Transação excluída com sucesso.'
          }
          onConfirm={() => {
            setShowSuccess(false);
          }}
        />
      )}
    </>
  );
};
