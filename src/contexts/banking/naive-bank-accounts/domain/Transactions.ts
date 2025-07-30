import { Transaction } from './Transaction';

export class Transactions {
  readonly items: Transaction[];

  constructor(items: Transaction[]) {
    this.items = items;
  }

  add(transaction: Transaction): Transactions {
    return new Transactions([...this.items, transaction]);
  }

  count(): number {
    return this.items.length;
  }

  equals(other: Transactions): boolean {
    if (this.items.length !== other.items.length) {
      return false;
    }
    
    return this.items.every((transaction, index) => 
      transaction.equals(other.items[index])
    );
  }
}