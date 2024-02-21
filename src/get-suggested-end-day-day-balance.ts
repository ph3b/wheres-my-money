import formatThousands from "format-thousands";
import { addMonths, differenceInDays, setDate, subMonths } from "date-fns";

const toCurrencyFormat = (amount: number) => formatThousands(amount) + " kr";

export const getSuggestedEndOfDayBalance = (
  payDayOfMonth: number,
  monthlySalary: number,
  currentDate: Date
) => {
  const nextPayDay = setDate(
    addMonths(currentDate, currentDate.getDate() < payDayOfMonth ? 0 : 1),
    payDayOfMonth
  );
  const previousPayDay = subMonths(nextPayDay, 1);

  const daysBetweenPayDays = differenceInDays(nextPayDay, previousPayDay);
  const averageSpendPrDay = monthlySalary / daysBetweenPayDays;

  const daysUntilPayDay = differenceInDays(nextPayDay, currentDate);

  return {
    balance: toCurrencyFormat(
      Math.ceil((daysUntilPayDay - 1) * averageSpendPrDay)
    ),
    prDay: toCurrencyFormat(Math.floor(averageSpendPrDay)),
  };
};
