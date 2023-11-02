import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BankingRole } from 'src/app/enum/entiesBanking';
import { Bank } from 'src/app/models/bank';
import { CoinService } from 'src/app/services/coin.service';
import { MessageServiceSocial } from 'src/app/services/message';
import { ConfigBancosComponent } from '../config-bancos/config-bancos.component';
import { filter } from 'rxjs';
import { MessageService } from 'primeng/api';

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
  personaliceBank: Bank[] = [];
  constructor(
    private coinService: CoinService,
    private _messageServiceSocial: MessageServiceSocial,
    private messageService: MessageService,
  ) { }

  ngOnInit() {

    // si el session storage  hay datos llena el arreglo del servicio con la data de lo contrario consumirá el servicio 
    if (localStorage.getItem('listBanks')) {
      this.coinService.listBanksConfiguration = JSON.parse(localStorage.getItem('listBanks') as string);
      this.refreshCoin();
    } else this.listBanks();
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
   *Lista los bancos disponibles
   *
   * @memberof StatusCoinComponent
   */
  listBanks(saveBankingRoles: BankingRole[] = []): void {

    this.loading = true;
    const defaultRoles = [
      BankingRole.banco_de_venezuela,
      BankingRole.bcv,
      BankingRole.enparalelovzla,
      BankingRole.monitor_dolar_venezuela,
      BankingRole.paypal,
      BankingRole.petro,
      BankingRole.zinli
    ];

    const validBankingRoles = saveBankingRoles.length > 0 ? saveBankingRoles : defaultRoles;

    let beforeBanks: Bank[] = []

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

            this.coinService.listBanksConfiguration.push(banco);

            let banks = JSON.stringify(this.coinService.listBanksConfiguration)
            localStorage.setItem('listBanks', banks);
          })
        });
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });


    this.personaliceBank.forEach((beforeBank) => {

      this.coinService.listBanksConfiguration.push(beforeBank)
      beforeBanks.push(beforeBank);

      localStorage.setItem('listBanks', JSON.stringify(beforeBanks));

    })
    this.personaliceBank = [];
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
      return 'text-green-400'
    } else if (this.entidadBancaria.symbol === '▲') {
      return 'text-red-400'
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
   *Desactiva un banco de la lista
   *
   * @param {number} index indice
   * @memberof StatusCoinComponent
   */
  deleteBank(index: number) {

    //INDEX DE LOS BACOS LOCALES
    let listBanksConfiguration: Bank = this.coinService.listBanksConfiguration[index];
    //ARREGLO DE BANCOS GUARDADOS
    let banksStorage: Bank[] = JSON.parse(localStorage.getItem('listBanks') as string);

    //se desactivan
    this.coinService.listBanksConfiguration[index].active = false;
    banksStorage[index].active = false

    //se filtra los activos
    let filtersBanks: Bank[] = this.coinService.listBanksConfiguration.filter(item => item.active == true);

    //si solo jhay un banco se vuelve activar e inpida que no se desactive

    if (filtersBanks.length < 1) {
      //como previamente se habia desactivado se vuelve activar
      this.coinService.listBanksConfiguration[index].active = true;
      banksStorage[index].active = true

      //mensaje
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No puedes eliminar todos lo bancos' });
      setTimeout(() => {
        return this.messageService.clear();
      }, 2000);
    }
    //se guarda en el local
    localStorage.setItem('listBanks', JSON.stringify(banksStorage));


    const indexRandom: number = Math.floor(Math.random() * (filtersBanks.length - 1 - 0)) + 0;

    //SI el banco es igual al seleccionado entonces cambiara a uno radon
    if (listBanksConfiguration.title === this.entidadBancaria.title) this.entidadBancaria = filtersBanks[indexRandom];

  }
  /**
   *Refresca los servicios
   *
   * @memberof StatusCoinComponent
   */
  refreshCoin() {
    let beforeBanks: BankingRole[] = [];
    localStorage.clear();

    this.coinService.listBanksConfiguration.forEach((entidad: any) => {
      if (entidad.key == BankingRole.personalice_bank) {
        this.personaliceBank.push(entidad)
      }
      if (entidad.active == true) {
        beforeBanks.push(entidad.key as BankingRole);
      }
    });
    this.coinService.listBanksConfiguration = [];
    this.listBanks(beforeBanks);

  }
}