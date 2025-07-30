import { Currency } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/Currency';
import { MotherCreator } from '../../../shared/domain/MotherCreator';

export class CurrencyMother {
  static create(value: string): Currency {
    return new Currency(value);
  }

  static random(): Currency {
    return this.create(MotherCreator.random().pickOne(['GBP', 'EUR', 'USD']));
  }

  static gbp(): Currency {
    return this.create('GBP');
  }

  static eur(): Currency {
    return this.create('EUR');
  }

  static usd(): Currency {
    return this.create('USD');
  }
}