import { AppError } from "./errors";
import { errorResponse } from "./response";
import { logger } from "./logger";

export function withErrorHandler<TContext = unknown>(
  handler: (req: Request, ctx: TContext) => Promise<Response>
) {
  return async (req: Request, ctx: TContext) => {
    try {
      return await handler(req, ctx);
    } catch (error: unknown) {
      // log estruturado
      logger.error({
        error,
        message: error instanceof Error ? error.message : "Unknown error",
        path: req.url,
        method: req.method,
      });
      // erro controlado
      if (error instanceof AppError) {
        return errorResponse(error.message, error.statusCode);
      }
      // erro inesperado
      return errorResponse("Erro interno do servidor", 500);
    }
  };
}