export class Balance {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  add(amount: number): Balance {
    return new Balance(this.value + amount);
  }

  subtract(amount: number): Balance {
    return new Balance(this.value - amount);
  }

  isNegative(): boolean {
    return this.value < 0;
  }

  isZero(): boolean {
    return this.value === 0;
  }

  exceedsOverdraftLimit(limit: number): boolean {
    return this.value < -Math.abs(limit);
  }

  equals(other: Balance): boolean {
    return this.value === other.value;
  }
}