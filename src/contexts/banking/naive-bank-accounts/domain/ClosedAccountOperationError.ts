export class ClosedAccountOperationError extends Error {
  constructor(operation: string) {
    super(`Cannot perform ${operation} operation on a closed account`);
    this.name = 'ClosedAccountOperationError';
  }
}