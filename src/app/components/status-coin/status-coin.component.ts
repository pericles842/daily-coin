import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BankingRole } from 'src/app/enum/entiesBanking';
import { Bank } from 'src/app/models/bank';
import { CoinService } from 'src/app/services/coin.service';
import { MessageServiceSocial } from 'src/app/services/message';
import { ConfigBancosComponent } from '../config-bancos/config-bancos.component';

@Component({
  selector: 'app-status-coin',
  templateUrl: './status-coin.component.html',
  styleUrls: ['./status-coin.component.scss']
})
export class StatusCoinComponent implements OnInit {

  /**
   *enmarado para traer una entidad
   *
   * @type {BankingRole}
   * @memberof StatusCoinComponent
   */
  @Input() typeStatus!: BankingRole;
  /**
   *Entidad bancaria
   *
   * @type {Bank}
   * @memberof StatusCoinComponent
   */
  @Output() bankingEntity = new EventEmitter<Bank>();

  /**
   *Parametro de entrada de  una entidad bacnararia
   *
   * @type {Bank}
   * @memberof StatusCoinComponent
   */
  entidadBancaria: Bank = new Bank();


  loading: boolean = false;
  constructor(
    private coinService: CoinService,
    private _messageServiceSocial: MessageServiceSocial
  ) { }

  ngOnInit() {

    //SI EL ARREGLO DE BANCOS CONFIG ESTA vacio no consume el servicio, para que no se duplique cada vez qu carga
    if (this.coinService.listBanksConfiguration.length === 0) this.listBanks();
    this.getBank(this.typeStatus);

  }
  /**
   *Obtiene una entidad bancaria
   *
   * @memberof AppComponent
   */
  getBank(bankingRole: BankingRole): any {
    this.loading = true;
    this.coinService.getBanking(bankingRole).subscribe({
      next: (res: any) => {
        this.entidadBancaria = res;
        this.loading = false;

        this.bankingEntity.emit(this.entidadBancaria)
      },
      error: (err) => {
        this.loading = false;
      }
    }
    );
  }
  /**
   *Lista los bancos dispobiblesd
   *
   * @memberof StatusCoinComponent
   */
  listBanks() {
    const validBankingRoles = [
      BankingRole.banco_de_venezuela,
      BankingRole.bcv,
      BankingRole.enparalelovzla,
      BankingRole.monitor_dolar_venezuela,
      BankingRole.paypal,
      BankingRole.petro,
      BankingRole.zinli
    ];
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

            if (validBankingRoles.includes(banco.key)) banco.active = true;

            this.coinService.listBanksConfiguration.push(banco)
          })
        });

      },
      error: (err) => {
      }
    });
  }
  /**
   *Cambia de banco al seleccionarlo en el botón
   *
   * @param {number} index
   * @param {OverlayPanel} op
   * @memberof StatusCoinComponent
   */
  changeBank(index: number, op: OverlayPanel) {
    this.entidadBancaria = this.coinService.listBanksConfiguration[index];
    op.hide()
    this.bankingEntity.emit(this.entidadBancaria)
  }
  /**
   *color roojo o verde en base al porcentaje del dolar
   *
   * @readonly
   * @memberof StatusCoinComponent
   */
  get changeColorStatistics() {
    if (this.entidadBancaria.symbol === '▼') {
      return 'text-red-400 '
    } else if (this.entidadBancaria.symbol === '▲') {
      return 'text-green-400 '
    } else {
      return 'text-color'
    }
  }
  /**
   *Comparte el estatus del dolar e una red social
   *
   * @memberof StatusCoinComponent
   */
  shareRateStatus() {
    let message = `🏦 ${this.entidadBancaria.title}\n💵 ${this.entidadBancaria.price} Bs \n🕒 ${this.entidadBancaria.last_update}\n${this.entidadBancaria.symbol == '' ? '' : this.entidadBancaria.symbol == '▲' ? '🔺' : '🔻'}  ${this.entidadBancaria.percent}  Bs ${this.entidadBancaria.change}\n\nmíralo tu mismo http://cointobs.rf.gd`.trim()


    this._messageServiceSocial.sendEmailWhatsApp(encodeURIComponent(message));
  }
  /**
   *Retorna los bancos configurables
   *
   * @readonly
   * @memberof StatusCoinComponent
   */
  get Bancos() {
    return this.coinService.listBanksConfiguration;
  }
  /**
   *Refresca el servicio
   *
   * @memberof StatusCoinComponent
   */
  // refreshStatus() {
  //   this.listBanks()
  //   this.getBank(this.entidadBancaria.key);
  // }
}