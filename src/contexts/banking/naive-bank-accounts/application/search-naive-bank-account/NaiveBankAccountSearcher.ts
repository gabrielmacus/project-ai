import { NaiveBankAccount } from '../../domain/NaiveBankAccount';
import { NaiveBankAccountId } from '../../domain/NaiveBankAccountId';
import { NaiveBankAccountRepository } from '../../domain/NaiveBankAccountRepository';
import { NaiveBankAccountNotFoundError } from '../../domain/NaiveBankAccountNotFoundError';

export class NaiveBankAccountSearcher {
  constructor(private repository: NaiveBankAccountRepository) {}

  async run(id: string): Promise<NaiveBankAccount> {
    const accountId = new NaiveBankAccountId(id);
    
    const account = await this.repository.search(accountId);
    if (!account) {
      throw new NaiveBankAccountNotFoundError(id);
    }
    
    return account;
  }
}