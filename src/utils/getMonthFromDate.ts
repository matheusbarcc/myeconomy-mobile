import { MonthValue } from "./getFirstDayOfMonth";

export function getMonthFromDate(date: Date): MonthValue {
  const months: MonthValue[] = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return months[date.getMonth()];
}
