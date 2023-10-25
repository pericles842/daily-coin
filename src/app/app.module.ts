import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { ConversionCoinComponent } from './components/conversion-coin/conversion-coin.component';
import { LoadingComponent } from './components/loading/loading.component';
import { StatusCoinComponent } from './components/status-coin/status-coin.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AppRoutingModule } from './routes';
import { HomeComponent } from './pages/home/home.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ConfigBancosComponent } from './components/config-bancos/config-bancos.component';
import { CheckboxModule } from 'primeng/checkbox';
import { HistoryCoinComponent } from './components/history-coin/history-coin.component';
import { CalendarModule } from 'primeng/calendar';
import { TasaPersonalizadaComponent } from './components/tasa-personalizada/tasa-personalizada.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    AppComponent,
    ConversionCoinComponent,
    StatusCoinComponent,
    LoadingComponent,
    TopbarComponent,
    HomeComponent,
    ConfigurationComponent,
    ConfigBancosComponent,
    HistoryCoinComponent,
    TasaPersonalizadaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputTextModule,
    CardModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
    FormsModule,
    AutoFocusModule,
    ProgressBarModule,
    ToastModule,
    ButtonModule,
    AppRoutingModule,
    CheckboxModule,
    CalendarModule,
    MessagesModule
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
