import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '@libs/midgard-angular/src/lib/pages/login/login.component';

const appRoutes: Routes = [
  // The entry point is the midgard library
  { path: '', component: LoginComponent },
  { path: 'main', loadChildren: '@libs/midgard-angular/src/lib/midgard.module#MidgardModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

