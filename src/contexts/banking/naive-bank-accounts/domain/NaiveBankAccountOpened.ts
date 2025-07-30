export class NaiveBankAccountOpened {
  static readonly EVENT_NAME = 'naive_bank_account.opened';

  readonly aggregateId: string;
  readonly currency: string;
  readonly occurredOn: Date;

  constructor(aggregateId: string, currency: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.currency = currency;
    this.occurredOn = occurredOn ?? new Date();
  }
}