import { Router, json, error } from "itty-router";
import { getSuggestedEndOfDayBalance } from "./get-suggested-end-of-day-balance";
import { ZodError, z } from "zod";

const getNorwegianCurrentDate = () =>
  new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Oslo" }));

const BalanceQueries = z.object({
  payDayOfMonth: z.number({ coerce: true }).gte(1).lte(28),
  salary: z.number({ coerce: true }).positive().safe(),
});

const router = Router();

router.get("/balance", (req) => {
  const { payDayOfMonth, salary } = BalanceQueries.parse(req.query);
  const norwegianCurrentDate = getNorwegianCurrentDate();

  return {
    ...getSuggestedEndOfDayBalance(payDayOfMonth, salary, norwegianCurrentDate),
    noTime: norwegianCurrentDate,
  };
});

export default {
  fetch: (request: Request, ...args: any) =>
    router
      .all("*", () => error(404))
      .handle(request, ...args)
      .then(json)
      .catch((error) => {
        if (error instanceof ZodError) {
          return json({ errors: error.errors }, { status: 400 });
        }

        throw error;
      }),
};
