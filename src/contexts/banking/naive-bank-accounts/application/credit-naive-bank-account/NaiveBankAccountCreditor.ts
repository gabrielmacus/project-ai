import { NaiveBankAccountId } from '../../domain/NaiveBankAccountId';
import { NaiveBankAccountRepository } from '../../domain/NaiveBankAccountRepository';
import { NaiveBankAccountNotFoundError } from '../../domain/NaiveBankAccountNotFoundError';

export class NaiveBankAccountCreditor {
  constructor(private repository: NaiveBankAccountRepository) {}

  async run(id: string, amount: number, transactionId: string, description: string): Promise<void> {
    const accountId = new NaiveBankAccountId(id);
    
    const account = await this.repository.search(accountId);
    if (!account) {
      throw new NaiveBankAccountNotFoundError(id);
    }
    
    account.credit(amount, transactionId, description);
    
    await this.repository.save(account);
  }
}