import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { TransactionItemVO } from '../../types/transaction-item.vo';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
  transactionItems$: BehaviorSubject<TransactionItemVO[]> =
    this.transactionService.getTransactionItems();

  filterForm: FormGroup = this.fb.group({
    filterInput: [''],
  });

  filteredTransactionItems$: Observable<TransactionItemVO[]> = combineLatest([
    this.transactionItems$.pipe(
      filter(
        (transactionItems) =>
          transactionItems !== undefined && transactionItems.length > 0
      )
    ),
    this.filterForm.controls.filterInput.valueChanges.pipe(
      debounceTime(50),
      startWith('')
      // filter(filterInput => filterInput !== undefined && filterInput.length > 0)
    ),
  ]).pipe(
    map(([transactionItems, filterInput]) => {
      console.log(
        'TCL: TransactionsListComponent -> constructor -> transactionItems',
        transactionItems
      );
      console.log(
        'TCL: TransactionsListComponent -> constructor -> filterInput',
        filterInput
      );

      return transactionItems.filter((transactionItem) =>
        transactionItem.merchant.name
          .toLowerCase()
          .includes(filterInput.toLowerCase())
      );
    })
  );

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    // do nothing.
  }

  ngOnInit(): void {
    // do nothing
  }
}
