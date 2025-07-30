export class NaiveBankAccountFrozen {
  static readonly EVENT_NAME = 'naive_bank_account.frozen';

  readonly aggregateId: string;
  readonly reason: string;
  readonly occurredOn: Date;

  constructor(aggregateId: string, reason: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.reason = reason;
    this.occurredOn = occurredOn ?? new Date();
  }
}