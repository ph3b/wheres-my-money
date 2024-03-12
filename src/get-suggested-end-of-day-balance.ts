import formatThousands from "format-thousands";
import {
  addMonths,
  differenceInDays,
  setDate,
  subMonths,
  previousFriday,
  isWeekend,
} from "date-fns";

const toCurrencyFormat = (amount: number) =>
  formatThousands(Math.floor(amount), { separator: " " }) + " kr";

/**
 * 1. Paydays is in this month, not weekend
 * 2. Paydays is in this month, weekend
 */

const getPayDayForMonth = (payDayOfMonth: number, dateForMonth: Date): Date => {
  const payDayDate = setDate(dateForMonth, payDayOfMonth);
  return isWeekend(payDayDate) ? previousFriday(payDayDate) : payDayDate;
};

const getPreviousPayDay = (payDayOfMonth: number, currentDate: Date): Date => {
  const payDayForMonth = getPayDayForMonth(payDayOfMonth, currentDate);
  if (payDayForMonth <= currentDate) {
    return payDayForMonth;
  }

  return getPayDayForMonth(payDayOfMonth, subMonths(currentDate, 1));
};

const getNextPayDay = (payDayOfMonth: number, currentDate: Date): Date => {
  const payDayForMonth = getPayDayForMonth(payDayOfMonth, currentDate);

  if (payDayForMonth > currentDate) {
    return payDayForMonth;
  }

  return getPayDayForMonth(payDayOfMonth, addMonths(currentDate, 1));
};

export const getSuggestedEndOfDayBalance = (
  payDayOfMonth: number,
  monthlySalary: number,
  currentDate: Date
) => {
  const nextPayDay = getNextPayDay(payDayOfMonth, currentDate);
  const previousPayDay = getPreviousPayDay(payDayOfMonth, currentDate);

  const averageSpendPrDay =
    monthlySalary / differenceInDays(nextPayDay, previousPayDay);

  const daysUntilPayDay = differenceInDays(nextPayDay, currentDate);
  const suggestBalance = (daysUntilPayDay - 1) * averageSpendPrDay;

  return {
    balance: toCurrencyFormat(suggestBalance),
    prDay: toCurrencyFormat(averageSpendPrDay),
    daysUntilPayDay,
  };
};
