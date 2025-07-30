import { NaiveBankAccount } from '../domain/NaiveBankAccount';
import { NaiveBankAccountId } from '../domain/NaiveBankAccountId';
import { Balance } from '../domain/Balance';
import { Currency } from '../domain/Currency';
import { NaiveBankAccountStatus } from '../domain/NaiveBankAccountStatus';
import { Transactions } from '../domain/Transactions';
import { Transaction } from '../domain/Transaction';
import { NaiveBankAccountRepository } from '../domain/NaiveBankAccountRepository';

export class PostgresNaiveBankAccountRepository implements NaiveBankAccountRepository {
  constructor(private connection: any) {}

  async save(account: NaiveBankAccount): Promise<void> {
    const query = `
      INSERT INTO naive_bank_accounts (id, balance, currency, status, transactions)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id)
      DO UPDATE SET
        balance = EXCLUDED.balance,
        status = EXCLUDED.status,
        transactions = EXCLUDED.transactions
    `;
    
    const values = [
      account.id.value,
      account.balance.value,
      account.currency.value,
      account.status,
      JSON.stringify(account.transactions.items)
    ];

    await this.connection.query(query, values);
  }

  async search(id: NaiveBankAccountId): Promise<NaiveBankAccount | null> {
    const query = 'SELECT * FROM naive_bank_accounts WHERE id = $1';
    const result = await this.connection.query(query, [id.value]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.toDomain(result.rows[0]);
  }

  async searchByBalance(balance: Balance): Promise<NaiveBankAccount[]> {
    const query = 'SELECT * FROM naive_bank_accounts WHERE balance = $1';
    const result = await this.connection.query(query, [balance.value]);

    return result.rows.map((row: any) => this.toDomain(row));
  }

  private toDomain(row: any): NaiveBankAccount {
    const transactions = JSON.parse(row.transactions).map((t: any) => 
      new Transaction(t.id, t.amount, t.description, new Date(t.timestamp))
    );

    return new NaiveBankAccount(
      new NaiveBankAccountId(row.id),
      new Balance(row.balance),
      new Currency(row.currency),
      row.status as NaiveBankAccountStatus,
      new Transactions(transactions)
    );
  }
}