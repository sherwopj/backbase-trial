import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './home/home.component';
import { MakeTransferComponent } from './make-transfer/make-transfer.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MakeTransferComponent,
    TransactionsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BbUIModule
  ],
  providers: [
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
