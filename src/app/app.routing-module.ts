import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const appRoutes: Routes = [
  // The entry point is the midgard library
  { path: '', loadChildren: '@libs/midgard-angular/src/lib/midgard.module#MidgardModule' },
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
