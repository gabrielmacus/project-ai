export class OverdraftLimitExceededError extends Error {
  constructor(currentBalance: number, limit: number) {
    super(`Overdraft limit exceeded. Current balance: £${currentBalance}, Limit: £${limit}`);
    this.name = 'OverdraftLimitExceededError';
  }
}