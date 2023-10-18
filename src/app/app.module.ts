import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { ConversionCoinComponent } from './components/conversion-coin/conversion-coin.component';
import { StatusCoinComponent } from './components/status-coin/status-coin.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ConversionCoinComponent,
    StatusCoinComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputTextModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
