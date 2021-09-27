import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { createAmountValidator } from './transfer-form-validators';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss']
})
export class MakeTransferComponent implements OnInit {

  transferForm = this.fb.group({
    fromAccount: ['Paul Sherwood ***386'],
    toAccount: ['', Validators.required],
    amount:  ['', [Validators.required, createAmountValidator()]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submitForm() {

  }



}
