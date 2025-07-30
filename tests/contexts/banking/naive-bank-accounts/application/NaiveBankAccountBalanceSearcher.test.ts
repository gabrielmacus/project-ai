import { NaiveBankAccountBalanceSearcher } from '../../../../../src/contexts/banking/naive-bank-accounts/application/search-naive-bank-account-by-balance/NaiveBankAccountBalanceSearcher';
import { NaiveBankAccountRepository } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountRepository';
import { NaiveBankAccountMother } from '../domain/NaiveBankAccountMother';
import { BalanceMother } from '../domain/BalanceMother';

describe('NaiveBankAccountBalanceSearcher', () => {
  let repository: jest.Mocked<NaiveBankAccountRepository>;
  let searcher: NaiveBankAccountBalanceSearcher;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      search: jest.fn(),
      searchByBalance: jest.fn(),
    } as jest.Mocked<NaiveBankAccountRepository>;
    
    searcher = new NaiveBankAccountBalanceSearcher(repository);
  });

  it('should return accounts with specified balance', async () => {
    const balance = BalanceMother.create(100);
    const accounts = [
      NaiveBankAccountMother.opened(),
      NaiveBankAccountMother.opened()
    ];
    
    repository.searchByBalance.mockResolvedValue(accounts);
    
    const result = await searcher.run(balance.value);
    
    expect(repository.searchByBalance).toHaveBeenCalledWith(balance);
    expect(result).toBe(accounts);
  });

  it('should return empty array when no accounts found', async () => {
    const balance = BalanceMother.create(100);
    
    repository.searchByBalance.mockResolvedValue([]);
    
    const result = await searcher.run(balance.value);
    
    expect(repository.searchByBalance).toHaveBeenCalledWith(balance);
    expect(result).toEqual([]);
  });
});