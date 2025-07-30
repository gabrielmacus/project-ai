import { faker } from '@faker-js/faker';

export class MotherCreator {
  static random() {
    return {
      number: (options?: { min?: number; max?: number }) => faker.number.int(options),
      string: () => faker.lorem.word(),
      pickOne: <T>(items: T[]): T => faker.helpers.arrayElement(items),
      boolean: () => faker.datatype.boolean(),
    };
  }
}