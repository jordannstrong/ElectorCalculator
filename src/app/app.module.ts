import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { ControlsComponent } from './controls/controls.component';
import { ResultBarComponent } from './map/result-bar/result-bar.component';
import { PollsService } from './polls.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ControlsComponent,
    ResultBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [PollsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
