import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { TransactionItemVO } from '../../types/transaction-item.vo';
import { ConfirmTransactionDialogComponent } from './confirm-transaction-dialog/confirm-transaction-dialog.component';
import { createAmountValidator } from './transfer-form-validators';

export const MINIMUM_BALANCE = 500;

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})
export class MakeTransferComponent implements OnInit {
  @Output() makeTransfer;

  transferForm: FormGroup;

  balance$: BehaviorSubject<number> = this.transactionService.getBalance();
  balance: number;

  constructor(
    private fb: FormBuilder,
    public matDialog: MatDialog,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.initialiseForm();

    this.balance$.subscribe((balance) => {
      this.transferForm.controls.fromAccount.setValue(
        `My Personal Account: €${(Math.round(balance * 100) / 100).toFixed(2)}`
      );
    });
  }

  initialiseForm() {
    this.transferForm = this.fb.group({
      fromAccount: [''],
      toAccount: ['', Validators.required],
      amount: [
        '',
        [
          Validators.required,
          createAmountValidator(this.balance$, MINIMUM_BALANCE),
        ],
      ],
    });
  }

  submitForm() {
    // If the form isnt valid we should allow a 'submit'
    if (!this.transferForm.valid) {
      return;
    }

    const newTransfer: TransactionItemVO = {
      categoryCode: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      dates: {
        valueDate: new Date(),
      },
      merchant: {
        accountNumber: '1231223423',
        name: this.transferForm.controls.toAccount.value,
      },
      transaction: {
        amountCurrency: {
          amount: parseFloat(this.transferForm.controls.amount.value),
          currencyCode: 'EUR',
        },
        creditDebitIndicator: 'DBIT',
        type: 'Online Transfer',
      },
    };

    const dialogConfig = new MatDialogConfig();
    const confirmationDialog = this.matDialog.open(
      ConfirmTransactionDialogComponent,
      {
        data: newTransfer,
        autoFocus: true,
        height: '200px',
        width: '300px',
      }
    );

    confirmationDialog.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.initialiseForm();

      this.transactionService.addTransaction(newTransfer);
    });
  }
}
