import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionItemVO } from 'src/app/types/transaction-item.vo';

@Component({
  selector: 'app-confirm-transaction-dialog',
  templateUrl: './confirm-transaction-dialog.component.html',
  styleUrls: ['./confirm-transaction-dialog.component.scss'],
})
export class ConfirmTransactionDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: TransactionItemVO) {}

  ngOnInit(): void {
    // do nothing
  }
}
