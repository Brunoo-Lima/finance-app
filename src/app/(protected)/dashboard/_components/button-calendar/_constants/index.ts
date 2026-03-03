export const MONTHS = [
  { label: 'Janeiro', value: 0 },
  { label: 'Fevereiro', value: 1 },
  { label: 'Março', value: 2 },
  { label: 'Abril', value: 3 },
  { label: 'Maio', value: 4 },
  { label: 'Junho', value: 5 },
  { label: 'Julho', value: 6 },
  { label: 'Agosto', value: 7 },
  { label: 'Setembro', value: 8 },
  { label: 'Outubro', value: 9 },
  { label: 'Novembro', value: 10 },
  { label: 'Dezembro', value: 11 },
];

const currentYear = new Date().getFullYear();
export const YEARS = [
  currentYear - 1,
  currentYear,
  currentYear + 1,
  currentYear + 2,
];
