import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './components/home/home.component';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { TransactionService } from './services/transaction.service';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { ConfirmTransactionDialogComponent } from './components/make-transfer/confirm-transaction-dialog/confirm-transaction-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MakeTransferComponent,
    TransactionsListComponent,
    ConfirmTransactionDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BbUIModule
  ],
  providers: [
    LoggedInGuard,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
