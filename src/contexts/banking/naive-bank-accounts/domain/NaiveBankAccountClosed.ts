export class NaiveBankAccountClosed {
  static readonly EVENT_NAME = 'naive_bank_account.closed';

  readonly aggregateId: string;
  readonly finalBalance: number;
  readonly occurredOn: Date;

  constructor(aggregateId: string, finalBalance: number, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.finalBalance = finalBalance;
    this.occurredOn = occurredOn ?? new Date();
  }
}