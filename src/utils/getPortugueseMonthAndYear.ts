export function getPortugueseMonthAndYear(date: Date) {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month}/${year}`;
}
