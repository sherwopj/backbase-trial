import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { TransactionItemVO } from '../../types/transaction-item.vo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  transactionsItems$: BehaviorSubject<TransactionItemVO[]> = this.transactionService.getTransactionItems()

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {

    // Initial transaction data load
    this.transactionService.loadInitialTransactions()


  }

}
