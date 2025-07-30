import { v4 as uuidv4 } from 'uuid';

export class UuidMother {
  static random(): string {
    return uuidv4();
  }
}