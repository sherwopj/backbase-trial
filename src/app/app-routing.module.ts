import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [  {
  path: '',
  canActivate: [LoggedInGuard],
  component: HomeComponent
},
{
  path: 'home',
  canActivate: [LoggedInGuard],
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
