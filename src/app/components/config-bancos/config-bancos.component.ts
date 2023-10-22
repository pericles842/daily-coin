import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { CoinService } from 'src/app/services/coin.service';

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
  banksTotals: Bank[] = [];
  /**
   *CARGA DEL COMPINENTE
   *
   * @type {boolean}
   * @memberof ConfigBancosComponent
   */
  loading: boolean = false

  constructor(
    private coinService: CoinService
  ) { }
  ngOnInit() {
    this.loading = true
    this.coinService.listBankingEntities().subscribe({
      next: (res: any) => {

        res.monitors;

        [res.monitors].forEach((entidad: any) => {
          Object.keys(entidad).forEach((key: string) => {

            const banco = new Bank();
            const entidadKey = entidad[key];

            banco.last_update = entidadKey.last_update;
            banco.price = entidadKey.price;
            banco.price_old = entidadKey.price_old;
            banco.title = entidadKey.title;
            banco.type = entidadKey.type;
            banco.key = key;
            banco.color = entidadKey.color;
            banco.percent = entidadKey.percent;
            banco.symbol = entidadKey.symbol;
            banco.change = entidadKey.change;


            this.banksTotals.push(banco);
            this.loading = false
          })
        });

      }, 
      error: () => {
        this.loading = false
      }
    });

  }
}
