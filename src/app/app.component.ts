import { Component, OnInit } from '@angular/core';
import { BankingRole } from './enum/entiesBanking';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  entidadBancaria!: BankingRole
  
  ngOnInit() {
    this.entidadBancaria = BankingRole.enparalelovzla;

  }

}
