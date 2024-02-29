import formatThousands from "format-thousands";
import {
  addMonths,
  differenceInDays,
  setDate,
  subMonths,
  previousFriday,
  isWeekend,
} from "date-fns";

const toCurrencyFormat = (amount: number) => formatThousands(amount) + " kr";

const getNextPayDay = (payDayOfMonth: number, currentDate: Date) => {
  const nextPayDay = setDate(
    addMonths(currentDate, currentDate.getDate() < payDayOfMonth ? 0 : 1),
    payDayOfMonth
  );

  return isWeekend(nextPayDay) ? previousFriday(nextPayDay) : nextPayDay;
};

export const getSuggestedEndOfDayBalance = (
  payDayOfMonth: number,
  monthlySalary: number,
  currentDate: Date
) => {
  const nextPayDay = getNextPayDay(payDayOfMonth, currentDate);
  const previousPayDay = subMonths(nextPayDay, 1);

  const averageSpendPrDay =
    monthlySalary / differenceInDays(nextPayDay, previousPayDay);

  const daysUntilPayDay = differenceInDays(nextPayDay, currentDate);

  return {
    balance: toCurrencyFormat(
      Math.ceil((daysUntilPayDay - 1) * averageSpendPrDay)
    ),
    prDay: toCurrencyFormat(Math.floor(averageSpendPrDay)),
  };
};
