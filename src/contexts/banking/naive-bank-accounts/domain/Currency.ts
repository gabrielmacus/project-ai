export class Currency {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidCurrency(value);
    this.value = value;
  }

  private ensureIsValidCurrency(value: string): void {
    const validCurrencies = ['GBP', 'EUR', 'USD'];
    if (!validCurrencies.includes(value)) {
      throw new Error(`Invalid currency: ${value}. Valid currencies are: ${validCurrencies.join(', ')}`);
    }
  }

  equals(other: Currency): boolean {
    return this.value === other.value;
  }
}