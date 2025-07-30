export class NaiveBankAccountUnfrozen {
  static readonly EVENT_NAME = 'naive_bank_account.unfrozen';

  readonly aggregateId: string;
  readonly occurredOn: Date;

  constructor(aggregateId: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.occurredOn = occurredOn ?? new Date();
  }
}