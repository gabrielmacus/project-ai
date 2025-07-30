import { PostgresNaiveBankAccountRepository } from '../../../../../src/contexts/banking/naive-bank-accounts/infrastructure/PostgresNaiveBankAccountRepository';
import { NaiveBankAccountMother } from '../domain/NaiveBankAccountMother';
import { NaiveBankAccountIdMother } from '../domain/NaiveBankAccountIdMother';
import { BalanceMother } from '../domain/BalanceMother';

describe('PostgresNaiveBankAccountRepository', () => {
  let repository: PostgresNaiveBankAccountRepository;
  let mockConnection: jest.Mocked<any>;

  beforeEach(() => {
    mockConnection = {
      query: jest.fn(),
    };
    
    repository = new PostgresNaiveBankAccountRepository(mockConnection);
  });

  describe('save', () => {
    it('should save a naive bank account', async () => {
      const account = NaiveBankAccountMother.opened();
      
      await repository.save(account);
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO naive_bank_accounts'),
        expect.arrayContaining([
          account.id.value,
          account.balance.value,
          account.currency.value,
          account.status,
          JSON.stringify(account.transactions.items)
        ])
      );
    });
  });

  describe('search', () => {
    it('should return a naive bank account when found', async () => {
      const id = NaiveBankAccountIdMother.random();
      const mockRow = {
        id: id.value,
        balance: 100,
        currency: 'GBP',
        status: 'open',
        transactions: JSON.stringify([])
      };
      
      mockConnection.query.mockResolvedValue({ rows: [mockRow] });
      
      const result = await repository.search(id);
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        'SELECT * FROM naive_bank_accounts WHERE id = $1',
        [id.value]
      );
      expect(result).toBeDefined();
      expect(result!.id.value).toBe(id.value);
    });

    it('should return null when account not found', async () => {
      const id = NaiveBankAccountIdMother.random();
      
      mockConnection.query.mockResolvedValue({ rows: [] });
      
      const result = await repository.search(id);
      
      expect(result).toBeNull();
    });
  });

  describe('searchByBalance', () => {
    it('should return accounts with specified balance', async () => {
      const balance = BalanceMother.create(100);
      const mockRows = [
        {
          id: NaiveBankAccountIdMother.random().value,
          balance: 100,
          currency: 'GBP',
          status: 'open',
          transactions: JSON.stringify([])
        }
      ];
      
      mockConnection.query.mockResolvedValue({ rows: mockRows });
      
      const result = await repository.searchByBalance(balance);
      
      expect(mockConnection.query).toHaveBeenCalledWith(
        'SELECT * FROM naive_bank_accounts WHERE balance = $1',
        [balance.value]
      );
      expect(result).toHaveLength(1);
      expect(result[0].balance.value).toBe(100);
    });

    it('should return empty array when no accounts found', async () => {
      const balance = BalanceMother.create(100);
      
      mockConnection.query.mockResolvedValue({ rows: [] });
      
      const result = await repository.searchByBalance(balance);
      
      expect(result).toEqual([]);
    });
  });
});