import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';
import { MidgardModule } from '@libs/midgard-angular/src/lib/midgard.module';

@NgModule({
  declarations: [
    AppComponent // just a wrapper that will intiate the app
  ],
  imports: [
    BrowserModule,
    MidgardModule, // imports midgard module which is our entry point
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
