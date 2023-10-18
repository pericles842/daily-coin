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
    this.loading = true;
    this.coinService.listBankingEntities().subscribe({
      next: (res: any) => {

        this.bancos.push(res.monitors);

        [res.monitors].forEach((entidad: Bank) => {
          Object.keys(entidad).forEach((key) => {
            let banco = new Bank;
            banco.key = key
            banco.title = this.uppercaseAndReplaceString(key);

            this.bancos.push(banco);
          })
        });

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }
  /**
   * trasforma el primer carácter en mayúscula y quita , o elementos 
   * @param text string
   * @returns string
   */
  uppercaseAndReplaceString(text: string) {
    let word = text.charAt(0).toUpperCase() + text.slice(1);
    console.log(text);
    
    return word.replaceAll('_', ' ')
  }
}
