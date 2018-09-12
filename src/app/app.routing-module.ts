import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MidgardComponent } from '@libs/midgard/src/lib/midgard.component';

const appRoutes: Routes = [
  // The entry point is the midgard library
  { path: '', loadChildren: '@libs/midgard/src/lib/midgard.module#MidgardModule' },
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
