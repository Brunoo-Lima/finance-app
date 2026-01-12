"use client";

import { ITransaction } from "@/@types/ITransaction";
import { TableRow } from "./table-row";
import s from "./_table.module.scss";
import { useState } from "react";
import { FormUpsertTransaction } from "../form/form-upsert-transaction";

interface ITableDataProps {
  data: ITransaction[];
  isEmpty?: boolean;
}

export const TableData = ({ data, isEmpty }: ITableDataProps) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);

  const handleEditTransaction = (transaction: ITransaction) => {
    setIsOpenModalEdit(true);
    setSelectedTransaction(transaction);
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
              />
            ))}
          </tbody>
        </table>

        {isEmpty && <p className={s.is__empty}>Não há transações</p>}
      </div>

      {isOpenModalEdit && (
        <FormUpsertTransaction
          transaction={selectedTransaction}
          onClose={() => setIsOpenModalEdit(false)}
        />
      )}
    </>
  );
};
