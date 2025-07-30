import { NaiveBankAccountSearcher } from '../../../../../src/contexts/banking/naive-bank-accounts/application/search-naive-bank-account/NaiveBankAccountSearcher';
import { NaiveBankAccountRepository } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountRepository';
import { NaiveBankAccountMother } from '../domain/NaiveBankAccountMother';
import { NaiveBankAccountIdMother } from '../domain/NaiveBankAccountIdMother';
import { NaiveBankAccountNotFoundError } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountNotFoundError';

describe('NaiveBankAccountSearcher', () => {
  let repository: jest.Mocked<NaiveBankAccountRepository>;
  let searcher: NaiveBankAccountSearcher;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      search: jest.fn(),
      searchByBalance: jest.fn(),
    } as jest.Mocked<NaiveBankAccountRepository>;
    
    searcher = new NaiveBankAccountSearcher(repository);
  });

  it('should return an existing naive bank account', async () => {
    const id = NaiveBankAccountIdMother.random();
    const account = NaiveBankAccountMother.opened(id);
    
    repository.search.mockResolvedValue(account);
    
    const result = await searcher.run(id.value);
    
    expect(repository.search).toHaveBeenCalledWith(id);
    expect(result).toBe(account);
  });

  it('should throw error when account does not exist', async () => {
    const id = NaiveBankAccountIdMother.random();
    
    repository.search.mockResolvedValue(null);
    
    await expect(searcher.run(id.value)).rejects.toThrow(NaiveBankAccountNotFoundError);
    
    expect(repository.search).toHaveBeenCalledWith(id);
  });
});