import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api'; import { timeout } from 'rxjs';
;
import { Bank } from 'src/app/models/bank';
import { CoinService } from 'src/app/services/coin.service';

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
    private messageService: MessageService
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
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Guardado' });

    setInterval(() => {
      this.messageService.clear();
    }, 1000);
  }
}
