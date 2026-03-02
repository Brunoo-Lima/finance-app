import { format, parse, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (value: string) => {
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

export const isValidDateInput = (value: string) => {
  if (value.length < 10) return null;
  const [day, month, year] = value.split('/').map(Number);
  if (month < 1 || month > 12) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return false;
  if (year < 1900 || year > 2100) return false;
  return true;
};

export const formatDateInput = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  let formatted = digits;
  if (digits.length > 4) {
    formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  } else if (digits.length > 2) {
    formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return formatted;
};
