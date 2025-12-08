import { ITransaction } from "@/@types/ITransaction";
import { TableRow } from "./table-row";
import s from "./_table.module.scss";

interface ITableDataProps {
  data: ITransaction[];
  isEmpty?: boolean;
}

export const TableData = ({ data, isEmpty }: ITableDataProps) => {
  return (
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
            <TableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>

      {isEmpty && <p>Não há transações</p>}
    </div>
  );
};
