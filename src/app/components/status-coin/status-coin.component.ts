import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BankingRole } from 'src/app/enum/entiesBanking';
import { Bank } from 'src/app/models/bank';
import { CoinService } from 'src/app/services/coin.service';

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
  entidadBancaria: Bank = new Bank();
  /**
   * Bancos disponibles
   *
   * @type {Bank[]}
   * @memberof StatusCoinComponent
   */
  bancos: Bank[] = [];

  loading: boolean = false;
  constructor(
    private coinService: CoinService
  ) { }

  ngOnInit() {
    this.listBanks();
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


            this.bancos.push(banco);
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
    this.entidadBancaria = this.bancos[index];
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
}
