import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '@src/midgard/pages/login/login.component';
import { RegisterComponent } from '@src/midgard/pages/register/register.component';

const appRoutes: Routes = [
  // The entry point is the midgard library
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
