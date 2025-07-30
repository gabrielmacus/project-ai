export class FrozenAccountOperationError extends Error {
  constructor(operation: string) {
    super(`Cannot perform ${operation} operation on a frozen account`);
    this.name = 'FrozenAccountOperationError';
  }
}