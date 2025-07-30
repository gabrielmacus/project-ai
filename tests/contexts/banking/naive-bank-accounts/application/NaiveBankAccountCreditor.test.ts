import { NaiveBankAccountCreditor } from '../../../../../src/contexts/banking/naive-bank-accounts/application/credit-naive-bank-account/NaiveBankAccountCreditor';
import { NaiveBankAccountRepository } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountRepository';
import { NaiveBankAccountMother } from '../domain/NaiveBankAccountMother';
import { NaiveBankAccountIdMother } from '../domain/NaiveBankAccountIdMother';
import { NaiveBankAccountNotFoundError } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountNotFoundError';
import { UuidMother } from '../../../shared/domain/UuidMother';

describe('NaiveBankAccountCreditor', () => {
  let repository: jest.Mocked<NaiveBankAccountRepository>;
  let creditor: NaiveBankAccountCreditor;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      search: jest.fn(),
      searchByBalance: jest.fn(),
    } as jest.Mocked<NaiveBankAccountRepository>;
    
    creditor = new NaiveBankAccountCreditor(repository);
  });

  it('should credit money to an existing naive bank account', async () => {
    const id = NaiveBankAccountIdMother.random();
    const account = NaiveBankAccountMother.opened(id);
    const amount = 100;
    const transactionId = UuidMother.random();
    const description = 'Salary payment';
    
    repository.search.mockResolvedValue(account);
    
    await creditor.run(id.value, amount, transactionId, description);
    
    expect(repository.search).toHaveBeenCalledWith(id);
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
      id: id,
      balance: expect.objectContaining({ value: 100 })
    }));
  });

  it('should throw error when account does not exist', async () => {
    const id = NaiveBankAccountIdMother.random();
    const amount = 100;
    const transactionId = UuidMother.random();
    const description = 'Salary payment';
    
    repository.search.mockResolvedValue(null);
    
    await expect(creditor.run(id.value, amount, transactionId, description)).rejects.toThrow(NaiveBankAccountNotFoundError);
    
    expect(repository.search).toHaveBeenCalledWith(id);
    expect(repository.save).not.toHaveBeenCalled();
  });
});