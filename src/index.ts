import { Router, json, error } from "itty-router";
import { getSuggestedEndOfDayBalance } from "./get-suggested-end-day-day-balance";
import { InputError } from "./input-error";

const parseIntOrThrow = (value: any, parameterName: string): number => {
  const salaryInt = parseInt(value);
  if (isNaN(salaryInt)) {
    throw new InputError(`Invalid or missing parameter '${parameterName}'`);
  }

  return salaryInt;
};

const router = Router()
  .get("/balance", (req) => {
    const { salary, payDayOfMonth } = req.query;

    const salaryInt = parseIntOrThrow(salary, "salary");
    const payDayOfMonthInt = parseIntOrThrow(payDayOfMonth, "payDayOfMonth");

    return getSuggestedEndOfDayBalance(payDayOfMonthInt, salaryInt, new Date());
  })
  .all("*", () => error(404));

export default {
  fetch: (request: Request, ...args: any) =>
    router
      .handle(request, ...args)
      .then(json)
      .catch((error) => {
        if (error instanceof InputError) {
          return json({ message: error.message }, { status: 400 });
        }
      }),
};
