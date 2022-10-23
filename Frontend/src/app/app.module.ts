import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { RectangleComponent } from './components/rectangle/rectangle.component';
import { RectangleHttpService } from './core/services/rectangleHttpService/rectangle-http.service';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    RectangleComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RectangleHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
