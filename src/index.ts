import { AutoRouter, IRequest } from "itty-router";
import { number } from "zod";

import { getSuggestedEODBalance as endOfDayBalance } from "./get-suggested-end-of-day-balance";
import { currentNorwayTime } from "./get-norwegian-current-time";
import { handleZodValidationErrors, createQueryValidator } from "./zod-utils";

type CFArgs = [];

const withQuery = createQueryValidator<CFArgs>();

const router = AutoRouter<IRequest, CFArgs>({
  base: "/wmm",
  catch: handleZodValidationErrors,
});

router.get(
  "/balance",
  withQuery({
    payDayOfMonth: number({ coerce: true }).gte(1).lte(28),
    salary: number({ coerce: true }).positive().safe(),
  }),
  (req) => endOfDayBalance(req.data, currentNorwayTime())
);

export default { ...router };
