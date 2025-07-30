import { NaiveBankAccountId } from './NaiveBankAccountId';
import { Balance } from './Balance';
import { Currency } from './Currency';
import { NaiveBankAccountStatus } from './NaiveBankAccountStatus';
import { Transactions } from './Transactions';
import { Transaction } from './Transaction';
import { NaiveBankAccountOpened } from './NaiveBankAccountOpened';
import { NaiveBankAccountClosed } from './NaiveBankAccountClosed';
import { NaiveBankAccountFrozen } from './NaiveBankAccountFrozen';
import { NaiveBankAccountUnfrozen } from './NaiveBankAccountUnfrozen';
import { NaiveBankAccountCredited } from './NaiveBankAccountCredited';
import { OverdraftLimitExceededError } from './OverdraftLimitExceededError';
import { FrozenAccountOperationError } from './FrozenAccountOperationError';
import { ClosedAccountOperationError } from './ClosedAccountOperationError';

export class NaiveBankAccount {
  private static readonly OVERDRAFT_LIMIT = 500; // £500
  
  readonly id: NaiveBankAccountId;
  private _balance: Balance;
  readonly currency: Currency;
  private _status: NaiveBankAccountStatus;
  private _transactions: Transactions;
  private _domainEvents: any[] = [];

  constructor(
    id: NaiveBankAccountId,
    balance: Balance,
    currency: Currency,
    status: NaiveBankAccountStatus,
    transactions: Transactions
  ) {
    this.id = id;
    this._balance = balance;
    this.currency = currency;
    this._status = status;
    this._transactions = transactions;
  }

  static open(id: NaiveBankAccountId, currency: Currency): NaiveBankAccount {
    const account = new NaiveBankAccount(
      id,
      new Balance(0),
      currency,
      NaiveBankAccountStatus.OPEN,
      new Transactions([])
    );
    
    account.recordDomainEvent(new NaiveBankAccountOpened(id.value, currency.value));
    return account;
  }

  get balance(): Balance {
    return this._balance;
  }

  get status(): NaiveBankAccountStatus {
    return this._status;
  }

  get transactions(): Transactions {
    return this._transactions;
  }

  get domainEvents(): any[] {
    return [...this._domainEvents];
  }

  credit(amount: number, transactionId: string, description: string): void {
    this.ensureIsNotClosed('credit');
    this.ensureIsNotFrozen('credit');

    if (amount <= 0) {
      throw new Error('Credit amount must be positive');
    }

    const newBalance = this._balance.add(amount);
    
    // Check overdraft limit if resulting balance is negative
    if (newBalance.isNegative() && newBalance.exceedsOverdraftLimit(NaiveBankAccount.OVERDRAFT_LIMIT)) {
      throw new OverdraftLimitExceededError(newBalance.value, NaiveBankAccount.OVERDRAFT_LIMIT);
    }

    const transaction = new Transaction(transactionId, amount, description, new Date());
    
    this._balance = newBalance;
    this._transactions = this._transactions.add(transaction);
    
    this.recordDomainEvent(new NaiveBankAccountCredited(this.id.value, amount, transactionId));
  }

  debit(amount: number, transactionId: string, description: string): void {
    this.ensureIsNotClosed('debit');
    this.ensureIsNotFrozen('debit');

    if (amount <= 0) {
      throw new Error('Debit amount must be positive');
    }

    const newBalance = this._balance.subtract(amount);
    
    // Check overdraft limit
    if (newBalance.exceedsOverdraftLimit(NaiveBankAccount.OVERDRAFT_LIMIT)) {
      throw new OverdraftLimitExceededError(newBalance.value, NaiveBankAccount.OVERDRAFT_LIMIT);
    }

    const transaction = new Transaction(transactionId, -amount, description, new Date());
    
    this._balance = newBalance;
    this._transactions = this._transactions.add(transaction);
  }

  close(): void {
    this.ensureIsNotClosed('close');
    
    this._status = NaiveBankAccountStatus.CLOSED;
    this.recordDomainEvent(new NaiveBankAccountClosed(this.id.value, this._balance.value));
  }

  freeze(reason: string): void {
    this.ensureIsNotClosed('freeze');
    
    if (this._status === NaiveBankAccountStatus.FROZEN) {
      throw new Error('Account is already frozen');
    }
    
    this._status = NaiveBankAccountStatus.FROZEN;
    this.recordDomainEvent(new NaiveBankAccountFrozen(this.id.value, reason));
  }

  unfreeze(): void {
    this.ensureIsNotClosed('unfreeze');
    
    if (this._status !== NaiveBankAccountStatus.FROZEN) {
      throw new Error('Account is not frozen');
    }
    
    this._status = NaiveBankAccountStatus.OPEN;
    this.recordDomainEvent(new NaiveBankAccountUnfrozen(this.id.value));
  }

  private ensureIsNotClosed(operation: string): void {
    if (this._status === NaiveBankAccountStatus.CLOSED) {
      throw new ClosedAccountOperationError(operation);
    }
  }

  private ensureIsNotFrozen(operation: string): void {
    if (this._status === NaiveBankAccountStatus.FROZEN) {
      throw new FrozenAccountOperationError(operation);
    }
  }

  private recordDomainEvent(event: any): void {
    this._domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }
}