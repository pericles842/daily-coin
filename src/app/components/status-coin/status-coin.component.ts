import { Component, Input, OnInit } from '@angular/core';
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
  entidadBancaria: Bank = new Bank();

  loading: boolean = false;
  constructor(
    private coinService: CoinService
  ) { }

  ngOnInit() {
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
      },
      error: (err) => {
        this.loading = false;
      }
    }
    );
  }

}
