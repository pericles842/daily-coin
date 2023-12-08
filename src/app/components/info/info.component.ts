import { Component, OnInit } from '@angular/core';
import { environment } from 'environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  version: string = environment.version

  /**
   *Aceptar términos y condiciones
   *
   * @type {Boolean}
   * @memberof InfoComponent
   */
  contrato: Boolean = false;

  ngOnInit(): void {

    this.contrato = localStorage.getItem('contract') !== null || Number(localStorage.getItem('contract')) !== 0
    //this.confirmationNotificación()

  }
  /**
   *Cambia el aceptar del contnrato
   *
   * @memberof InfoComponent
   */
  changeContrato(){
    if(this.contrato){
      localStorage.setItem('contract','1')
    }else localStorage.setItem('contract','0')
  }
}
