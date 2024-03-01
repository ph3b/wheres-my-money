import { getSuggestedEndOfDayBalance } from "./get-suggested-end-of-day-balance";

test("Should calculate correctly when payday is on a friday", () => {
  const date = new Date(2023, 10, 5);
  const { balance, prDay } = getSuggestedEndOfDayBalance(10, 10000, date); // 10th in november is a friday
  expect(prDay).toBe("322 kr");
  expect(balance).toBe("1 290 kr");
});

test("Should calculate correctly when payday is on a sunday", () => {
  const date = new Date(2024, 2, 5);
  const { balance, prDay } = getSuggestedEndOfDayBalance(10, 10000, date); // 10th in march is a sunday.
  expect(prDay).toBe("344 kr");
  expect(balance).toBe("689 kr");
});

test("Should calculate correctly when current day is after payday of same month", () => {
  const date = new Date(2024, 2, 15);
  const { balance, prDay } = getSuggestedEndOfDayBalance(10, 10000, date); // 10th in march is a sunday.
  expect(prDay).toBe("322 kr");
  expect(balance).toBe("8 064 kr");
});

test("Should calculate correctly when current day is payday", () => {
  const date = new Date(2024, 2, 10);
  const { balance, prDay } = getSuggestedEndOfDayBalance(10, 10000, date); // 10th in march is a sunday.
  expect(prDay).toBe("322 kr");
  expect(balance).toBe("9 677 kr");
});
