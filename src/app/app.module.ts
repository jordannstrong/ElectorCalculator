import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { ControlsComponent } from './controls/controls.component';
import { ResultBarComponent } from './result-bar/result-bar.component';
import { ScraperService } from './scraper.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ControlsComponent,
    ResultBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [ScraperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
