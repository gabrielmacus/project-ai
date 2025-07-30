export class NaiveBankAccountNotFoundError extends Error {
  constructor(id: string) {
    super(`Naive bank account with id ${id} not found`);
    this.name = 'NaiveBankAccountNotFoundError';
  }
}