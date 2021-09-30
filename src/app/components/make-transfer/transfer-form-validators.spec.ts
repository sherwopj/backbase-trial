import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import {
  MakeTransferComponent,
  MINIMUM_BALANCE,
} from './make-transfer.component';
import { BehaviorSubject } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';

describe('MakeTransferComponent', () => {
  let fixture: ComponentFixture<MakeTransferComponent>;
  let app: MakeTransferComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MakeTransferComponent],
      imports: [ReactiveFormsModule, MatDialogModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    app = fixture.debugElement.componentInstance;
    app.balance$ = new BehaviorSubject<number>(1000);
    fixture.detectChanges();
  });

  describe(`Test the validity of the fields`, () => {
    it(`should return true if amount is valid`, () => {
      const amount = app.transferForm.controls['amount'];
      amount.setValue(50);
      expect(amount.valid).toBeTruthy();
    });
  });
});
