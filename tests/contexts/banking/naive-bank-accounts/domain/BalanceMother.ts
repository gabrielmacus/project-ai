import { Balance } from '../../../../../src/contexts/banking/naive-bank-accounts/domain/Balance';
import { MotherCreator } from '../../../shared/domain/MotherCreator';

export class BalanceMother {
  static create(value: number): Balance {
    return new Balance(value);
  }

  static random(): Balance {
    return this.create(MotherCreator.random().number({ min: 0, max: 10000 }));
  }

  static zero(): Balance {
    return this.create(0);
  }

  static negative(): Balance {
    return this.create(-MotherCreator.random().number({ min: 1, max: 500 }));
  }

  static withOverdraft(): Balance {
    return this.create(-MotherCreator.random().number({ min: 1, max: 500 }));
  }
}