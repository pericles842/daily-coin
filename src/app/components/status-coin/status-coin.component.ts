import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BankingRole } from 'src/app/enum/entiesBanking';
import { Bank } from 'src/app/models/bank';
import { CoinService } from 'src/app/services/coin.service';
import { MessageServiceSocial } from 'src/app/services/message';

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
    public elementRef:ElementRef
  ) { }

  ngOnInit() {
    this.refreshCoin()
  }

  tutorialFocus(event_id:any) {
    console.log(event_id);
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
  }
  /**
   *Obtiene una entidad bancaria
   *
   * @memberof AppComponent
   */
  getBank(bankingRole: BankingRole, listBanksConfiguration: Bank[]): any {
    this.entidadBancaria = listBanksConfiguration.find(item => item.key === bankingRole) as Bank
    this.bankingEntity.emit(this.entidadBancaria)
  }

  defaultRolesTheBank(saveBankingRoles: BankingRole[]) {
    //Roles por default
    const defaultRoles = [
      BankingRole.bcv,
      BankingRole.enparalelovzla,
      BankingRole.zinli,
      BankingRole.el_dorado
    ];
    //Valida los bancos en base  al la configuración o por el default
    return saveBankingRoles.length > 0 ? saveBankingRoles : defaultRoles;

  }
  /**
   *Lista los bancos disponibles
   *
   * @memberof StatusCoinComponent
   */
  listBanks(saveBankingRoles: BankingRole[] = []): void {
    this.loading = true
    //Valida los bancos en base  al la configuración o por el default
    const validBankingRoles = this.defaultRolesTheBank(saveBankingRoles)

    this.coinService.listBankingDailyCoin().subscribe({
      next: (res: any) => {

        res.lista_bancos.forEach((bank: Bank) => {
          let symbol = bank.label_status === 'bajo' ? '▼' : bank.label_status === 'alto' ? '▲' : '';
          let price_string = bank.price.toString().replace(',', '.');
          bank.price = parseFloat(price_string).toFixed(2) as unknown as number;
          bank.percentage = bank.percentage;
          bank.symbol = symbol;
          bank.active = false

          //según la configuración de BANCOS se activa o desactiva
          if (validBankingRoles.includes(bank.key)) bank.active = true;

          //guardado de localstorage y servicios
          this.coinService.listBanksConfiguration.push(bank);

        });

        //setea los BANCOS_PERSONALIZADOS
        if (this.personaliceBank.length > 0) {
          this.coinService.listBanksConfiguration = this.personaliceBank.concat(this.coinService.listBanksConfiguration)
          this.personaliceBank = [];
        }

        //se guarda en el local storage
        let banks = JSON.stringify(this.coinService.listBanksConfiguration)
        localStorage.setItem('listBanks', banks);
        this.getBank(this.typeStatus, this.coinService.listBanksConfiguration);

        this.loading = false
      },
      error: (err) => {
        this.loading = false
        this.messageService.add({ severity: 'error', summary: 'Error de carga', detail: 'Hubo problema, por favor refrescar la pagina' });
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
    let message = `🏦 ${this.entidadBancaria.name}\n💵 ${this.entidadBancaria.price} Bs \n🕒 ${this.entidadBancaria.date}\n${this.entidadBancaria.symbol == '' ? '' : this.entidadBancaria.symbol == '▲' ? '🔺' : '🔻'}  ${this.entidadBancaria.percentage}\n\nmíralo tu mismo http://cointobs.rf.gd`.trim()

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
    if (listBanksConfiguration.name === this.entidadBancaria.name) this.entidadBancaria = filtersBanks[indexRandom];

  }
  /**
   *Refresca los servicios 
   *
   * @memberof StatusCoinComponent
   */
  refreshCoin() {

    //configuración de bancos
    let BankingRoleBeforeBank: BankingRole[] = []
    let banksStorage: Bank[] = JSON.parse(localStorage.getItem('listBanks') as string);

    if (banksStorage !== null) {

      localStorage.removeItem('listBanks');
      this.coinService.listBanksConfiguration = [];

      banksStorage.forEach((entidad: any) => {
        //bancos activos
        if (entidad.active) BankingRoleBeforeBank.push(entidad.key as BankingRole);
        //bancos personalizados 
        if (entidad.key == BankingRole.personalice_bank) this.personaliceBank.push(entidad)
      });
    }

    this.listBanks(BankingRoleBeforeBank);

  }
}