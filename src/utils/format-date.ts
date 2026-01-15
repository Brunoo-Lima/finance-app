import { format, parse, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDateTransaction = (value: string) => {
  const parsed = parse(value, 'dd/MM/yyyy', new Date());
  return format(parsed, "dd MMM',' yyyy", { locale: ptBR });
};

export const isValidDate = (value: string): boolean => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;

  const parsed = parse(value, 'dd/MM/yyyy', new Date());
  if (!isValid(parsed)) return false;

  const reformatted = format(parsed, 'dd/MM/yyyy');

  return reformatted === value;
};
