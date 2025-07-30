import { Transaction } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/Transaction';
import { UuidMother } from '../../../shared/domain/UuidMother';
import { MotherCreator } from '../../../shared/domain/MotherCreator';

export class TransactionMother {
  static create(id: string, amount: number, description: string, timestamp: Date): Transaction {
    return new Transaction(id, amount, description, timestamp);
  }

  static random(): Transaction {
    return this.create(
      UuidMother.random(),
      MotherCreator.random().number({ min: -1000, max: 1000 }),
      MotherCreator.random().string(),
      new Date()
    );
  }

  static credit(amount?: number): Transaction {
    return this.create(
      UuidMother.random(),
      amount ?? MotherCreator.random().number({ min: 1, max: 1000 }),
      'Credit transaction',
      new Date()
    );
  }

  static debit(amount?: number): Transaction {
    return this.create(
      UuidMother.random(),
      -(amount ?? MotherCreator.random().number({ min: 1, max: 1000 })),
      'Debit transaction',
      new Date()
    );
  }
}