import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import initialTransactionData from '../bb-ui/mock-data/transactions.json';
import {
  DirtyTransactionItemVO,
  TransactionItemVO,
} from '../types/transaction-item.vo';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionItems$: BehaviorSubject<TransactionItemVO[]> =
    new BehaviorSubject([]);

  private balance$: BehaviorSubject<number> = new BehaviorSubject(0);

  // if (resourcePackFiles && resourcePackFiles.length > 0) {
  //   this.resourcePackSize = resourcePackFiles
  //     // .map(resourcePackFile => resourcePackFile.size)
  //     .reduce((accumulator: number, currentValue: ResourcePackFile) => +accumulator + +currentValue.size, 0);
  //   this.resourcePackFileCount = resourcePackFiles.length;
  // }

  constructor() {}

  loadInitialTransactions(): void {
    // Unfortunately the data coming in has some type inconsistencies
    const dirtyTransactions: DirtyTransactionItemVO[] =
      initialTransactionData.data;

    // Lets try to tidy up our data
    const cleansedTransactions: TransactionItemVO[] = dirtyTransactions.map(
      (transactionItem: DirtyTransactionItemVO) => {
        return {
          categoryCode: transactionItem.categoryCode,
          dates: {
            valueDate: new Date(transactionItem.dates.valueDate),
          },
          merchant: transactionItem.merchant,
          transaction: {
            amountCurrency: {
              amount:
                typeof transactionItem.transaction.amountCurrency.amount ===
                'string'
                  ? parseFloat(
                      transactionItem.transaction.amountCurrency.amount
                    )
                  : transactionItem.transaction.amountCurrency.amount,
              currencyCode:
                transactionItem.transaction.amountCurrency.currencyCode,
            },
            creditDebitIndicator:
              transactionItem.transaction.creditDebitIndicator === 'CRDT'
                ? 'CRDT'
                : 'DBIT',
            type: transactionItem.transaction.type,
          },
        };
      }
    );

    console.log(
      'TCL: TransactionService -> constructor -> cleansedTransactions',
      cleansedTransactions
    );
    this.transactionItems$.next(
      cleansedTransactions.sort(
        (a, b) => b.dates.valueDate.getTime() - a.dates.valueDate.getTime()
      )
    );

    this.transactionItems$
      .pipe(
        filter(
          (transactionItems) =>
            transactionItems !== undefined && transactionItems.length > 0
        )
      )
      .subscribe((transactionItems: TransactionItemVO[]) => {
        const balance = transactionItems.reduce(
          (accumulator: number, transactionItem: TransactionItemVO) => {
            if (transactionItem.transaction.creditDebitIndicator === 'CRDT') {
              return (
                accumulator + transactionItem.transaction.amountCurrency.amount
              );
            } else {
              return (
                accumulator - transactionItem.transaction.amountCurrency.amount
              );
            }
          },
          0
        );

        this.balance$.next(balance);
      });
  }

  getTransactionItems() {
    return this.transactionItems$;
  }

  getBalance() {
    return this.balance$;
  }

  addTransaction(transactionItem: TransactionItemVO) {
    const transactionItems: TransactionItemVO[] =
      this.transactionItems$.getValue();
    transactionItems.unshift(transactionItem);
    this.transactionItems$.next(transactionItems);
  }
}
