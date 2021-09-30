import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TransactionItemVO } from 'src/app/types/transaction-item.vo';

import { ConfirmTransactionDialogComponent } from './confirm-transaction-dialog.component';

describe('ConfirmTransactionDialogComponent', () => {
  let component: ConfirmTransactionDialogComponent;
  let fixture: ComponentFixture<ConfirmTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmTransactionDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockTransactionItemVO },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export const mockTransactionItemVO: TransactionItemVO = {
  categoryCode: '#123456',
  dates: {
    valueDate: new Date(),
  },
  merchant: {
    accountNumber: '123qwe',
    name: 'ACME',
  },
  transaction: {
    amountCurrency: {
      amount: 12.34,
      currencyCode: 'EUR',
    },
    creditDebitIndicator: 'DBIT',
    type: 'TEST',
  },
};
