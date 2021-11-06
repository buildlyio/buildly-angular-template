import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MidgardModule } from '@src/midgard/midgard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent, // just a wrapper that will intiate the app
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MidgardModule,
    BrowserAnimationsModule,
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
