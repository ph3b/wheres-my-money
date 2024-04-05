import { RequestHandler, IRequest, StatusError, json } from "itty-router";
import { ZodError, z } from "zod";

export const validateQuery =
  <T extends z.ZodRawShape>(
    zodObject: z.ZodObject<T>
  ): RequestHandler<IRequest & { data: z.infer<typeof zodObject> }> =>
  (request) => {
    request.data = zodObject.parse(request.query);
  };

export const handleZodValidationErrors = (error: StatusError) => {
  if (error instanceof ZodError) {
    return json({ errors: error.errors }, { status: 400 });
  }

  throw error;
};
