import { getSuggestedEndOfDayBalance } from "./get-suggested-end-of-day-balance";

test("Should calculate correctly when payday is not during weekend", () => {
  const date = new Date(2023, 10, 5);
  const { balance, prDay, daysUntilPayDay } = getSuggestedEndOfDayBalance(
    10,
    10000,
    date
  );
  expect(prDay).toBe("322 kr");
  expect(balance).toBe("1 290 kr");
  expect(daysUntilPayDay).toBe(5);
});

test("Should calculate correctly when current day is after payday of same month", () => {
  const date = new Date(2024, 2, 15);
  const { balance, prDay, daysUntilPayDay } = getSuggestedEndOfDayBalance(
    10,
    10000,
    date
  );
  expect(prDay).toBe("303 kr");
  expect(balance).toBe("7 575 kr");
  expect(daysUntilPayDay).toBe(26);
});

test("Weekend payday - current day is after actual payday but same as pay day of month", () => {
  const date = new Date(2024, 3, 10);
  const { balance, prDay, daysUntilPayDay } = getSuggestedEndOfDayBalance(
    10,
    10000,
    date
  );
  expect(prDay).toBe("333 kr");
  expect(balance).toBe("9 666 kr");
  expect(daysUntilPayDay).toBe(30);
});

test("Weekend payday - current day is after actual payout day but before pay day of month", () => {
  const date = new Date(2024, 2, 9);
  const { balance, prDay, daysUntilPayDay } = getSuggestedEndOfDayBalance(
    10,
    10000,
    date
  );

  expect(prDay).toBe("303 kr");
  expect(balance).toBe("9 393 kr");
  expect(daysUntilPayDay).toBe(32);
});

test("Weekend payday - current date is actual payout day", () => {
  const date = new Date(2024, 2, 8);
  const { balance, prDay, daysUntilPayDay } = getSuggestedEndOfDayBalance(
    10,
    10000,
    date
  );
  expect(prDay).toBe("303 kr");
  expect(balance).toBe("9 696 kr");
  expect(daysUntilPayDay).toBe(33);
});

test("Weekend payday - current date before actual payout day", () => {
  const date = new Date(2024, 2, 7);
  const { balance, prDay, daysUntilPayDay } = getSuggestedEndOfDayBalance(
    10,
    10000,
    date
  );
  expect(prDay).toBe("357 kr");
  expect(balance).toBe("0 kr");
  expect(daysUntilPayDay).toBe(1);
});

test("Weekend payday - current date after", () => {
  const date = new Date(2024, 2, 12);
  const { balance, prDay, daysUntilPayDay } = getSuggestedEndOfDayBalance(
    10,
    20000,
    date
  );
  expect(prDay).toBe("606 kr");
  expect(balance).toBe("16 969 kr");
  expect(daysUntilPayDay).toBe(29);
});
