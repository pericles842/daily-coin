import { Component, OnInit } from '@angular/core';
import { BankingRole } from './enum/entiesBanking';
import { Bank } from './models/bank';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  entidadBancaria!: BankingRole

  bancoActual: Bank = new Bank()

  ngOnInit() {
    this.entidadBancaria = BankingRole.enparalelovzla;

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
  topbarRutes(event:any) {
    
  }
}
