import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginAdminComponent } from './login-admin/login-admin.component';

const midgardAdminRoutes: Routes = [
  { path: '', component: LoginAdminComponent },
  { path: 'login', component: LoginAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(midgardAdminRoutes)],
  exports: [RouterModule]
})
export class MidgardAdminRoutingModule {}
