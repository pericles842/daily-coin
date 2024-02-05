import { Component, HostListener, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { CoinService } from 'src/app/services/coin.service';
import { StatusCoinComponent } from '../status-coin/status-coin.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-config-bancos',
  templateUrl: './config-bancos.component.html',
  styleUrls: ['./config-bancos.component.scss']
})
export class ConfigBancosComponent implements OnInit {

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
    private coinService: CoinService,
    private router: Router
  ) { }
  ngOnInit() {
    //si el home no a cargado carga el componente home
    if (this.coinService.listBanksConfiguration.length === 0) this.router.navigate(['/home']);
  }
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
  banksSelected(index: number) {
    console.log('banksSelected');
    //banco del  sesion storage
    let banksStorage = JSON.parse(localStorage.getItem('listBanks') as string)
    let statusBank: boolean = banksStorage[index].active


    this.coinService.listBanksConfiguration[index].active = !statusBank ? true : false;
    banksStorage[index].active = !statusBank ? true : false

    localStorage.setItem('listBanks', JSON.stringify(banksStorage));

  }
  /**
   *Eliminar bancos personalizados
   *
   * @param {number} index
   * @param {boolean} isClick
   * @memberof ConfigBancosComponent
   */
  deleteBankPersonalice(index: number, isClick: boolean) {
    let banksStorage = JSON.parse(localStorage.getItem('listBanks') as string)

    let listBanksConfiguration = this.coinService.listBanksConfiguration;
    listBanksConfiguration.splice(index, 1)

    banksStorage.splice(index, 1);
    localStorage.setItem('listBanks', JSON.stringify(banksStorage));

  }

}
