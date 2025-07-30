import { NaiveBankAccountId } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountId';
import { UuidMother } from '../../../shared/domain/UuidMother';

export class NaiveBankAccountIdMother {
  static create(value: string): NaiveBankAccountId {
    return new NaiveBankAccountId(value);
  }

  static random(): NaiveBankAccountId {
    return this.create(UuidMother.random());
  }
}