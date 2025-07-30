import { NaiveBankAccountUnfreezer } from '../../../../../src/contexts/banking/naive-bank-accounts/application/unfreeze-naive-bank-account/NaiveBankAccountUnfreezer';
import { NaiveBankAccountRepository } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountRepository';
import { NaiveBankAccountMother } from '../domain/NaiveBankAccountMother';
import { NaiveBankAccountIdMother } from '../domain/NaiveBankAccountIdMother';
import { NaiveBankAccountNotFoundError } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountNotFoundError';

describe('NaiveBankAccountUnfreezer', () => {
  let repository: jest.Mocked<NaiveBankAccountRepository>;
  let unfreezer: NaiveBankAccountUnfreezer;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      search: jest.fn(),
      searchByBalance: jest.fn(),
    } as jest.Mocked<NaiveBankAccountRepository>;
    
    unfreezer = new NaiveBankAccountUnfreezer(repository);
  });

  it('should unfreeze a frozen naive bank account', async () => {
    const id = NaiveBankAccountIdMother.random();
    const account = NaiveBankAccountMother.frozen(id);
    
    repository.search.mockResolvedValue(account);
    
    await unfreezer.run(id.value);
    
    expect(repository.search).toHaveBeenCalledWith(id);
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
      id: id,
      status: 'open'
    }));
  });

  it('should throw error when account does not exist', async () => {
    const id = NaiveBankAccountIdMother.random();
    
    repository.search.mockResolvedValue(null);
    
    await expect(unfreezer.run(id.value)).rejects.toThrow(NaiveBankAccountNotFoundError);
    
    expect(repository.search).toHaveBeenCalledWith(id);
    expect(repository.save).not.toHaveBeenCalled();
  });
});