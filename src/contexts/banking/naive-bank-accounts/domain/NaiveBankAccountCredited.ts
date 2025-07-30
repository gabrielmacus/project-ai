export class NaiveBankAccountCredited {
  static readonly EVENT_NAME = 'naive_bank_account.credited';

  readonly aggregateId: string;
  readonly amount: number;
  readonly transactionId: string;
  readonly occurredOn: Date;

  constructor(aggregateId: string, amount: number, transactionId: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.amount = amount;
    this.transactionId = transactionId;
    this.occurredOn = occurredOn ?? new Date();
  }
}