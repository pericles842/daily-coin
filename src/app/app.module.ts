import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
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
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InfoComponent } from './components/info/info.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';



import { ParsePricePipe } from './pipes/parse-price.pipe';
import { LabelHeaderPipe } from './pipes/label-header.pipe';
import { GetDayWeekPipe } from './pipes/get-day-week.pipe';
import { DatesPipe } from './pipes/dates.pipe';



import { TutorialComponent } from './components/tutorial/tutorial.component';
import { CalculadoraComponent } from './components/calculadora/calculadora.component';
import { HistoryCoinComponent } from './components/history-coin/history-coin.component';
import { AppComponent } from './app.component';
import { ConversionCoinComponent } from './components/conversion-coin/conversion-coin.component';
import { LoadingComponent } from './components/loading/loading.component';
import { StatusCoinComponent } from './components/status-coin/status-coin.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AppRoutingModule } from './routes';
import { HomeComponent } from './pages/home/home.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ConfigBancosComponent } from './components/config-bancos/config-bancos.component';
import { TasaPersonalizadaComponent } from './components/tasa-personalizada/tasa-personalizada.component';
import { ConfigThemeComponent } from './components/config-theme/config-theme.component';
import { HeaderComponent } from './components/header/header.component';

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
    InfoComponent,
    ConfigThemeComponent,
    HeaderComponent,
    LabelHeaderPipe,
    ParsePricePipe,
    CalculadoraComponent,
    GetDayWeekPipe,
    DatesPipe,
    TutorialComponent
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
    MessagesModule,
    InputMaskModule,
    DialogModule,
    ConfirmPopupModule,
    TagModule,
    AccordionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
