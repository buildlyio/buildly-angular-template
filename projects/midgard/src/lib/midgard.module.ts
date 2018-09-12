import { NgModule } from '@angular/core';
import { MidgardComponent } from './midgard.component';
import { MidgardRoutingModule } from '@libs/midgard/src/lib/midgard.routing-module';

@NgModule({
  imports: [
    MidgardRoutingModule
  ],
  declarations: [MidgardComponent],
  exports: [MidgardComponent]
})
export class MidgardModule { }
