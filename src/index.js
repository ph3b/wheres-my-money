const formatThousands = require("format-thousands");
const express = require("express");
const app = express();

const { addMonths, differenceInDays, setDate, subMonths } = require("date-fns");

const getSuggestedEndOfDayBalance = (
  payDayOfMonth,
  monthlySalary,
  currentDate
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
    balance: Math.ceil((daysUntilPayDay - 1) * averageSpendPrDay),
    prDay: Math.floor(averageSpendPrDay),
  };
};

const toCurrencyFormat = (amount) => formatThousands(amount) + " kr";

app.get("/balance", (req, res) => {
  if (!req.query.payDayOfMonth) {
    return res.json({
      error: "Missing query 'payDayOfMonth'",
    });
  }

  if (!req.query.salary) {
    return res.json({
      error: "Missing query 'salary'",
    });
  }

  const payday = req.query.payDayOfMonth;
  const salary = req.query.salary;

  const { balance, prDay } = getSuggestedEndOfDayBalance(
    payday,
    salary,
    new Date()
  );

  return res.json({
    balance: toCurrencyFormat(balance),
    prDay: toCurrencyFormat(prDay),
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
