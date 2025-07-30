export class Transaction {
  readonly id: string;
  readonly amount: number;
  readonly description: string;
  readonly timestamp: Date;

  constructor(id: string, amount: number, description: string, timestamp: Date) {
    this.id = id;
    this.amount = amount;
    this.description = description;
    this.timestamp = timestamp;
  }

  equals(other: Transaction): boolean {
    return this.id === other.id;
  }
}