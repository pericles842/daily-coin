import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CoinHistory, DataHistoryCoin } from 'src/app/interfaces/coin-history';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-history-coin',
  templateUrl: './history-coin.component.html',
  styleUrls: ['./history-coin.component.scss']
})
export class HistoryCoinComponent implements OnInit {

  /**
   *Respuesta de historial  de monedass
   *
   * @type {CoinHistory[]}
   * @memberof HistoryCoinComponent
   */
  historial_monedas!: CoinHistory
  /**
   *Data de cada moneda del historial
   *
   * @type {DataHistoryCoin[]}
   * @memberof HistoryCoinComponent
   */
  dataMoneda: DataHistoryCoin[] = []
  /**
   *menu de las tasas
   *
   * @type {{ label: string, key: number }[]}
   * @memberof HistoryCoinComponent
   */
  menu_monedas: { label: string, key: string, active: boolean }[] = [];


  loading: boolean = false

  constructor(
    private coinService: CoinService,
    private messageService: MessageService,
    private route: Router
  ) { }
  ngOnInit() {
    this.getHistory();
  }
  /**
   *Trae el historial de bancos
   *
   * @memberof HistoryCoinComponent
   */
  getHistory() {
    this.loading = true

    this.coinService.historyEntities().subscribe({
      next: (res: any) => {
        this.historial_monedas = res;

        //algoritmo de menu 
        [this.historial_monedas].forEach((items) => {
          Object.keys(items).forEach((label) => {

            //llenamos el menu
            this.menu_monedas.push({
              label: label,
              key: label,
              active: false
            })
          })

        })
        //setea el valor de el historial banco central
        this.changeCoinHistory('BCV')
        this.loading = false
      },
      error: (erro) => {
        this.loading = false
        this.messageService.add({ severity: 'error', summary: 'Error de carga', detail: '' });
      }
    })
  }

  /**
   *Se encarga de cambiar la vista del historial de monedas
   *
   * @param {string} key key del arreglo
   * @memberof HistoryCoinComponent
   */
  changeCoinHistory(key: string) {
    this.dataMoneda = this.historial_monedas[key]
    this.menu_monedas.forEach((menuMoneda) => {

      if (menuMoneda.key == key) {
        menuMoneda.active = true
      } else {
        menuMoneda.active = false
      }
    })

  }
  /**
   *Retorna una clase
   *
   * @param {string} status
   * @return {*} 
   * @memberof HistoryCoinComponent
   */
  ColorStatistics(status: string) {
    if (status === 'bajo') {
      return ' text-green-400  pi pi-caret-down '
    } else if (status === 'alto') {
      return 'text-red-400 pi pi-caret-up '
    } else {
      return ' text-color pi pi-minus '
    }
  }
}
