import { NaiveBankAccountFreezer } from '../../../../../src/contexts/banking/naive-bank-accounts/application/freeze-naive-bank-account/NaiveBankAccountFreezer';
import { NaiveBankAccountRepository } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountRepository';
import { NaiveBankAccountMother } from '../domain/NaiveBankAccountMother';
import { NaiveBankAccountIdMother } from '../domain/NaiveBankAccountIdMother';
import { NaiveBankAccountNotFoundError } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountNotFoundError';

describe('NaiveBankAccountFreezer', () => {
  let repository: jest.Mocked<NaiveBankAccountRepository>;
  let freezer: NaiveBankAccountFreezer;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      search: jest.fn(),
      searchByBalance: jest.fn(),
    } as jest.Mocked<NaiveBankAccountRepository>;
    
    freezer = new NaiveBankAccountFreezer(repository);
  });

  it('should freeze an existing naive bank account', async () => {
    const id = NaiveBankAccountIdMother.random();
    const account = NaiveBankAccountMother.opened(id);
    const reason = 'Suspicious activity detected';
    
    repository.search.mockResolvedValue(account);
    
    await freezer.run(id.value, reason);
    
    expect(repository.search).toHaveBeenCalledWith(id);
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
      id: id,
      status: 'frozen'
    }));
  });

  it('should throw error when account does not exist', async () => {
    const id = NaiveBankAccountIdMother.random();
    const reason = 'Suspicious activity detected';
    
    repository.search.mockResolvedValue(null);
    
    await expect(freezer.run(id.value, reason)).rejects.toThrow(NaiveBankAccountNotFoundError);
    
    expect(repository.search).toHaveBeenCalledWith(id);
    expect(repository.save).not.toHaveBeenCalled();
  });
});