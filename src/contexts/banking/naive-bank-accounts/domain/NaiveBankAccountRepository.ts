import { NaiveBankAccount } from './NaiveBankAccount';
import { NaiveBankAccountId } from './NaiveBankAccountId';
import { Balance } from './Balance';

export interface NaiveBankAccountRepository {
  save(account: NaiveBankAccount): Promise<void>;
  search(id: NaiveBankAccountId): Promise<NaiveBankAccount | null>;
  searchByBalance(balance: Balance): Promise<NaiveBankAccount[]>;
}