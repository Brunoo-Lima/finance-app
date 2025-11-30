import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDateTransaction = (value: string) => {
  const parsed = parse(value, "dd/MM/yyyy", new Date());
  return format(parsed, "dd MMM',' yyyy", { locale: ptBR });
};
