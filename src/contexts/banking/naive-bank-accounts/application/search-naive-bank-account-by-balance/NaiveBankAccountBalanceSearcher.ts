import { NaiveBankAccount } from '../../domain/NaiveBankAccount';
import { Balance } from '../../domain/Balance';
import { NaiveBankAccountRepository } from '../../domain/NaiveBankAccountRepository';

export class NaiveBankAccountBalanceSearcher {
  constructor(private repository: NaiveBankAccountRepository) {}

  async run(balance: number): Promise<NaiveBankAccount[]> {
    const balanceValue = new Balance(balance);
    
    return await this.repository.searchByBalance(balanceValue);
  }
}