export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public details?: unknown;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR', details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export const asAppError = (error: unknown): AppError => {
  if (error instanceof AppError) return error;

  if (error instanceof SyntaxError) {
    return new AppError('Invalid JSON payload', 400, 'INVALID_JSON');
  }

  if (error instanceof Error) {
    return new AppError(error.message, 500, 'INTERNAL_ERROR');
  }

  return new AppError('Unexpected error', 500, 'INTERNAL_ERROR');
};
