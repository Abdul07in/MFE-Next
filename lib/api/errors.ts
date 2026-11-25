export interface AppErrorShape {
  code: string;
  message: string;
  status?: number;
  requestId?: string;
  recoverable: boolean;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly status?: number;
  public readonly requestId?: string;
  public readonly recoverable: boolean;

  constructor(shape: AppErrorShape) {
    super(shape.message);
    this.name = 'AppError';
    this.code = shape.code;
    this.status = shape.status;
    this.requestId = shape.requestId;
    this.recoverable = shape.recoverable;
  }
}

/**
 * Normalizes unknown thrown values into AppError for consistent handling.
 * @param error Unknown value thrown by transport or application code.
 * @param fallbackMessage Safe message used when the error is not typed.
 * @returns AppError instance with stable shape for UI and logging.
 */
export function toAppError(error: unknown, fallbackMessage: string): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError({
      code: 'UNEXPECTED_ERROR',
      message: error.message || fallbackMessage,
      recoverable: true,
    });
  }

  return new AppError({
    code: 'UNEXPECTED_ERROR',
    message: fallbackMessage,
    recoverable: true,
  });
}
