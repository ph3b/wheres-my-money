# 💸 Wheres my money
A simple API that returns the amount of money you should have available at the current date, according to your salary, salary date, assuming you spend the same amount every day, throughout a month.

## Why?
To keep track of how much money you should have in your account at any given day.

## Example
Assuming you expect to have 10 000 kr available for spending each month, and your salary is payed the 15th every month.
`GET https://wheres-my-money-cf-dev.miden.workers.dev/balance?salary=10000&payDayOfMonth=15`

Returns
```json
{
  "balance": "7 420 kr",
  "prDay": "322 kr"
}
```

## My use case
I use this together with [Widgeridoo](https://noidentity.ch/widgeridoo/) to display a small widget on my phone that always shows the balance I'm expected to have.
