import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '@libs/midgard-angular/src/lib/pages/login/login.component';
import { RegisterComponent } from '@libs/midgard-angular/src/lib/pages/register/register.component';

const appRoutes: Routes = [
  // The entry point is the midgard library
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

