import { Component } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { CoinService } from 'src/app/services/coin.service';


@Component({
  selector: 'app-config-bancos',
  templateUrl: './config-bancos.component.html',
  styleUrls: ['./config-bancos.component.scss']
})
export class ConfigBancosComponent {



  /**
   *-TODOS LOS BANCOS
   *
   * @type {Bank[]}
   * @memberof ConfigBancosComponent
   */
  newBanks: Bank[] = [];
  /**
   *CARGA DEL COMPONENTE
   *
   * @type {boolean}
   * @memberof ConfigBancosComponent
   */
  loading: boolean = false;

  constructor(
    private coinService: CoinService
  ) { }
  /**
   *Retorna la configuracion de los bancos en uso
   *
   * @readonly
   * @memberof ConfigBancosComponent
   */
  get BancosEnUso() {
    return this.coinService.listBanksConfiguration
  }
  /**
   *banco seleccinado 
   *
   * @param {*} event
   * @memberof ConfigBancosComponent
   */
  banksSelected(event: any, index: number) {
    //banco del sesion storage
    let banksStorage = JSON.parse(localStorage.getItem('listBanks') as string)

    this.coinService.listBanksConfiguration[index].active = event.checked ? true : false;
    banksStorage[index].active = event.checked ? true : false

    localStorage.setItem('listBanks', JSON.stringify(banksStorage));

  }
}
