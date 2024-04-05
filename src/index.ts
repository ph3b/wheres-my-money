import { AutoRouter } from "itty-router";
import { z } from "zod";

import { getSuggestedEndOfDayBalance } from "./get-suggested-end-of-day-balance";
import { getNorwegianCurrentTime } from "./get-norwegian-current-time";
import { handleZodValidationErrors, validateQuery } from "./zod-utils";

const router = AutoRouter({
  base: "/wmm",
  catch: handleZodValidationErrors,
});

router.get(
  "/balance",
  validateQuery(
    z.object({
      payDayOfMonth: z.number({ coerce: true }).gte(1).lte(28),
      salary: z.number({ coerce: true }).positive().safe(),
    })
  ),
  ({ data: { payDayOfMonth, salary } }) =>
    getSuggestedEndOfDayBalance(
      payDayOfMonth,
      salary,
      getNorwegianCurrentTime()
    )
);

export default {
  fetch: (req: Request, ...args: any[]) => router.fetch(req, ...args),
};
