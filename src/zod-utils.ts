import { RequestHandler, IRequest, StatusError, json } from "itty-router";
import { ZodError, z } from "zod";

export const createQueryValidator =
  <CFArgs extends any[]>() =>
  <T extends z.ZodRawShape>(
    shape: T
  ): RequestHandler<IRequest & { data: z.infer<z.ZodObject<T>> }, CFArgs> =>
  (req, ..._) => {
    req.data = z.object(shape).parse(req.query);
  };

export const handleZodValidationErrors = (error: StatusError) => {
  if (error instanceof ZodError) {
    return json({ errors: error.errors }, { status: 400 });
  }

  throw error;
};
