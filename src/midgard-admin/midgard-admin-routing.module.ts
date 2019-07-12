import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { MainAdminComponent } from './pages/main-admin/main-admin.component';
import { AdminAuthGuard } from './guards/auth.guard';

const midgardAdminRoutes: Routes = [
  { path: '', component: LoginAdminComponent },
  { path: 'login', component: LoginAdminComponent },
  { path: 'main/:endpoint', component: MainAdminComponent, canActivate: [AdminAuthGuard] },
  { path: 'main/:endpoint/:id', component: MainAdminComponent, canActivate: [AdminAuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(midgardAdminRoutes)],
  exports: [RouterModule]
})
export class MidgardAdminRoutingModule {}
