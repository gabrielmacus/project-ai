import { NaiveBankAccountId } from '../../domain/NaiveBankAccountId';
import { NaiveBankAccountRepository } from '../../domain/NaiveBankAccountRepository';
import { NaiveBankAccountNotFoundError } from '../../domain/NaiveBankAccountNotFoundError';

export class NaiveBankAccountFreezer {
  constructor(private repository: NaiveBankAccountRepository) {}

  async run(id: string, reason: string): Promise<void> {
    const accountId = new NaiveBankAccountId(id);
    
    const account = await this.repository.search(accountId);
    if (!account) {
      throw new NaiveBankAccountNotFoundError(id);
    }
    
    account.freeze(reason);
    
    await this.repository.save(account);
  }
}