import { Component, OnInit } from '@angular/core';
import { BankingRole } from 'src/app/enum/entiesBanking';
import { Bank } from 'src/app/models/bank';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  entidadBancaria!: BankingRole

  bancoActual: Bank = new Bank()

  ngOnInit() {
    this.entidadBancaria = BankingRole.bcv;

  }
  /**
   *Captura el banco actualS
   *
   * @param {Bank} Bank Banco
   * @memberof AppComponent
   */
  currentBankingEntity(Bank: Bank) {
    this.bancoActual = Bank
  }
  /**
   *Evento para cambiar de pagina en el topbar
   *
   * @memberof AppComponent
   */
  topbarRutes(event: any) {

  }
}
