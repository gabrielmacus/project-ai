import { NaiveBankAccount } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccount';
import { NaiveBankAccountId } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountId';
import { Currency } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/Currency';
import { Balance } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/Balance';
import { NaiveBankAccountStatus } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountStatus';
import { Transactions } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/Transactions';
import { NaiveBankAccountIdMother } from './NaiveBankAccountIdMother';
import { CurrencyMother } from './CurrencyMother';
import { BalanceMother } from './BalanceMother';

export class NaiveBankAccountMother {
  static create(
    id: NaiveBankAccountId,
    balance: Balance,
    currency: Currency,
    status: NaiveBankAccountStatus,
    transactions: Transactions
  ): NaiveBankAccount {
    return new NaiveBankAccount(id, balance, currency, status, transactions);
  }

  static opened(id?: NaiveBankAccountId, currency?: Currency): NaiveBankAccount {
    return this.create(
      id ?? NaiveBankAccountIdMother.random(),
      BalanceMother.zero(),
      currency ?? CurrencyMother.random(),
      NaiveBankAccountStatus.OPEN,
      new Transactions([])
    );
  }

  static closed(id?: NaiveBankAccountId, currency?: Currency): NaiveBankAccount {
    return this.create(
      id ?? NaiveBankAccountIdMother.random(),
      BalanceMother.random(),
      currency ?? CurrencyMother.random(),
      NaiveBankAccountStatus.CLOSED,
      new Transactions([])
    );
  }

  static frozen(id?: NaiveBankAccountId, currency?: Currency): NaiveBankAccount {
    return this.create(
      id ?? NaiveBankAccountIdMother.random(),
      BalanceMother.random(),
      currency ?? CurrencyMother.random(),
      NaiveBankAccountStatus.FROZEN,
      new Transactions([])
    );
  }
}