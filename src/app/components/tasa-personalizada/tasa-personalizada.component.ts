import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Bank } from 'src/app/models/bank';
import { CoinService } from 'src/app/services/coin.service';
;

@Component({
  selector: 'app-tasa-personalizada',
  templateUrl: './tasa-personalizada.component.html',
  styleUrls: ['./tasa-personalizada.component.scss']
})
export class TasaPersonalizadaComponent {

  newMonto: Bank = new Bank()
  /**
   *Guarda un monto personalizado
   *
   * @memberof TasaPersonalizadaComponent
   */
  constructor(
    private coinService: CoinService,
    private messageService: MessageService,
    private route: Router
  ) { }
  /**
   *guardar monto nuevo
   *
   * @memberof TasaPersonalizadaComponent
   */
  saveCup() {
    this.newMonto.active = true;
    this.newMonto.last_update = new Date().toString();
    this.coinService.listBanksConfiguration.push(this.newMonto);
    this.messageService.add({ severity: 'success', summary: '', detail: 'Guardado con éxito' });

    let banksStorage = JSON.parse(sessionStorage.getItem('listBanks') as string)
    banksStorage.push(this.newMonto)
    sessionStorage.setItem('listBanks', JSON.stringify(banksStorage));

    setTimeout(() => {
      this.messageService.clear();
      this.route.navigateByUrl('/home')
    }, 2000);
  
  }
}
