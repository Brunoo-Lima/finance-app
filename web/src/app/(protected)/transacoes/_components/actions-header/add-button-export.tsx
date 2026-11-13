import { Button } from '@/components/ui/button/button';
import { DownloadIcon } from 'lucide-react';
import {
  getCategoryLabel,
  getPaymentLabel,
  getTransactionType,
} from '../../_constants';
import { formatCurrencyBR } from '@/utils/format-currency';
import { formatDate } from 'date-fns';
import { useCallback, useState } from 'react';

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
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const exportToExcel = useCallback(async () => {
    if (isExporting || !data?.length) return;

    setIsExporting(true);

    try {
      const XLSX = await import('xlsx');

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
    } finally {
      setIsExporting(false);
    }
  }, [data, fileName, sheetName, isExporting]);

  return (
    <>
      <Button
        variant="cancel"
        onClick={exportToExcel}
        disabled={disabled || !data?.length || isExporting}
      >
        <DownloadIcon size={16} />
        Exportar
      </Button>
    </>
  );
};
