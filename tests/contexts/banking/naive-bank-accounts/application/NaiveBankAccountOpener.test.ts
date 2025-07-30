import { NaiveBankAccountOpener } from '../../../../../src/contexts/banking/naive-bank-accounts/application/open-naive-bank-account/NaiveBankAccountOpener';
import { NaiveBankAccountRepository } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/NaiveBankAccountRepository';
import { NaiveBankAccountMother } from '../domain/NaiveBankAccountMother';
import { NaiveBankAccountIdMother } from '../domain/NaiveBankAccountIdMother';
import { CurrencyMother } from '../domain/CurrencyMother';

describe('NaiveBankAccountOpener', () => {
  let repository: jest.Mocked<NaiveBankAccountRepository>;
  let opener: NaiveBankAccountOpener;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      search: jest.fn(),
      searchByBalance: jest.fn(),
    } as jest.Mocked<NaiveBankAccountRepository>;
    
    opener = new NaiveBankAccountOpener(repository);
  });

  it('should open a new naive bank account', async () => {
    const id = NaiveBankAccountIdMother.random();
    const currency = CurrencyMother.random();
    
    await opener.run(id.value, currency.value);
    
    const expectedAccount = NaiveBankAccountMother.opened(id, currency);
    
    expect(repository.save).toHaveBeenCalledWith(expectedAccount);
  });
});