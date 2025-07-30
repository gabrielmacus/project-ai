import { NaiveBankAccount } from '../../domain/NaiveBankAccount';
import { NaiveBankAccountId } from '../../domain/NaiveBankAccountId';
import { Currency } from '../../domain/Currency';
import { NaiveBankAccountRepository } from '../../domain/NaiveBankAccountRepository';

export class NaiveBankAccountOpener {
  constructor(private repository: NaiveBankAccountRepository) {}

  async run(id: string, currency: string): Promise<void> {
    const accountId = new NaiveBankAccountId(id);
    const accountCurrency = new Currency(currency);
    
    const account = NaiveBankAccount.open(accountId, accountCurrency);
    
    await this.repository.save(account);
  }
}