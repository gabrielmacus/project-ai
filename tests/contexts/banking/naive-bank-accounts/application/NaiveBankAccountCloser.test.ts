import { NaiveBankAccountCloser } from '../../../../../src/contexts/banking/naive-bank-accounts/application/close-naive-bank-account/NaiveBankAccountCloser';
import { NaiveBankAccountRepository } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountRepository';
import { NaiveBankAccountMother } from '../domain/NaiveBankAccountMother';
import { NaiveBankAccountIdMother } from '../domain/NaiveBankAccountIdMother';
import { NaiveBankAccountNotFoundError } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountNotFoundError';

describe('NaiveBankAccountCloser', () => {
  let repository: jest.Mocked<NaiveBankAccountRepository>;
  let closer: NaiveBankAccountCloser;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      search: jest.fn(),
      searchByBalance: jest.fn(),
    } as jest.Mocked<NaiveBankAccountRepository>;
    
    closer = new NaiveBankAccountCloser(repository);
  });

  it('should close an existing naive bank account', async () => {
    const id = NaiveBankAccountIdMother.random();
    const account = NaiveBankAccountMother.opened(id);
    
    repository.search.mockResolvedValue(account);
    
    await closer.run(id.value);
    
    expect(repository.search).toHaveBeenCalledWith(id);
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
      id: id,
      status: 'closed'
    }));
  });

  it('should throw error when account does not exist', async () => {
    const id = NaiveBankAccountIdMother.random();
    
    repository.search.mockResolvedValue(null);
    
    await expect(closer.run(id.value)).rejects.toThrow(NaiveBankAccountNotFoundError);
    
    expect(repository.search).toHaveBeenCalledWith(id);
    expect(repository.save).not.toHaveBeenCalled();
  });
});