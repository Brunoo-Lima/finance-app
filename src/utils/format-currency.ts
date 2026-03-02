export const formatCurrencyBR = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatCurrencyInput = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, '');

  if (!onlyNumbers) return '';

  return (Number(onlyNumbers) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const parseCurrency = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, '');
  return Number(onlyNumbers) / 100;
};
