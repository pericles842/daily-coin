import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { HomeComponent } from './pages/home/home.component';
import { ConfigBancosComponent } from './components/config-bancos/config-bancos.component';
import { HistoryCoinComponent } from './components/history-coin/history-coin.component';
import { TasaPersonalizadaComponent } from './components/tasa-personalizada/tasa-personalizada.component';
import { InfoComponent } from './components/info/info.component';



// Definir las rutas
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'config', component: ConfigurationComponent },
    { path: 'config/bancos-config', component: ConfigBancosComponent },
    { path: 'config/tasa-personalizada', component: TasaPersonalizadaComponent },
    { path: 'history', component: HistoryCoinComponent },
    { path: 'config/info', component: InfoComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
