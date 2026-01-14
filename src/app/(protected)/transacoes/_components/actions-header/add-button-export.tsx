import { Button } from '@/components/ui/button/button';
import { DownloadIcon } from 'lucide-react';
import * as XLSX from 'xlsx';
import {
  getCategoryLabel,
  getPaymentLabel,
  getTransactionType,
} from '../../_constants';
import { formatCurrencyBR } from '@/utils/format-currency';
import { formatDate } from 'date-fns';

interface IAddButtonExportProps {
  data: any[];
  fileName?: string;
  sheetName?: string;
  disabled?: boolean;
}

export const AddButtonExport = ({
  data,
  fileName = 'transacoes',
  sheetName = 'Transações',
  disabled = false,
}: IAddButtonExportProps) => {
  const exportToExcel = () => {
    if (!data || data.length === 0) return;

    try {
      const formattedData = data.map((item) => ({
        Nome: item.name,
        Tipo: getTransactionType(item.type),
        Categoria: getCategoryLabel(item.category),
        'Método de Pagamento': getPaymentLabel(item.payment),
        Valor: formatCurrencyBR(item.amount),
        Data: item.created_at,
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      XLSX.writeFile(
        workbook,
        `${`${fileName} - ${formatDate(new Date(), 'dd/MM/yyyy')}`}.xlsx`,
      );
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
    }
  };

  return (
    <>
      <Button
        variant="cancel"
        onClick={exportToExcel}
        disabled={disabled || !data || data.length === 0}
      >
        <DownloadIcon size={16} />
        Exportar
      </Button>
    </>
  );
};
