import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { environment } from 'environment';
import { BankingRole } from '../enum/entiesBanking';
import { Bank } from '../models/bank';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  /**
   *Lista de bancos configurables
   *
   * @type {Bank[]}
   * @memberof CoinService
   */
  listBanksConfiguration: Bank[] = [];
  /**
   *conexión a bas de datos
   *
   * @private
   * @type {*}
   * @memberof CoinService
   */
  public DB: any;

  constructor(
    private http: HttpClient
  ) { }
  /**
   *Obtiene todas las entidades bancarias disponible
   *
   * @memberof CoinService
   */
  listBankingEntities() {
    return this.http.get(environment.url + 'api/v1/dollar/page?page=exchangemonitor')
  }
  /**
   *Obtiene una entidad bancaria
   *
   * @memberof CoinService
   */
  getBanking(entity: BankingRole) {
    return this.http.get(environment.url + `api/v1/dollar/page?page=exchangemonitor&monitor=${entity}`);
  }
  /**
   *historial de los precios del dolar en la semana
   *
   * @memberof CoinService
   */
  historyEntities() {
    return this.http.get(environment.url + 'api/v1/dollar/history');
  }
  /**
   *Retorna los precios del banco central
   *
   * @return {*} 
   * @memberof CoinService
   */
  getBankBCV() {
    return this.http.get(environment.url + `api/v1/dollar/page?page=bcv`);

  }
  /**
   *Lista de bancos propios de la app
   *
   * @return {*} 
   * @memberof CoinService
   */
  listBankingDailyCoin() {
    return new Observable((observer) => {

      let newBankingList: any = {}

      const listBankingObservable = this.listBankingEntities();
      const bcvObservable = this.getBankBCV();

      forkJoin([listBankingObservable, bcvObservable]).subscribe({
        next: ([banking, bankingBCV]: [any, any]) => {
          newBankingList = banking.monitors;

          let { date, time } = bankingBCV.datetime;
          //fecha
          // let fechaBcv: string = `${date}, ${time}`;
          //precio actualizado
          newBankingList.bcv.price = bankingBCV.monitors.usd.price
          newBankingList.bcv.last_update = this.transformDate(date,time)

          observer.next({
            newBankingList,
          });
          observer.complete();
        },
        error: (err) => {
          console.log('error');
          observer.error('error');
        },
      });
    });
  }
  /**
   *RETORNA UN STRING DE LA FECHA
   * 
   * @param {string} dateToString
   * @memberof CoinService
   */
  transformDate(date: string , concat:string) {
    //convertimos array
    let dateToArray = date.split(" ")
    //contenemos
    let dateToString = `${dateToArray[3]} ${dateToArray[1]} ${dateToArray[5]} `;

    const fecha = new Date(dateToString);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan desde 0, por lo que necesitas sumar 1
    const anio = fecha.getFullYear();
    return `${dia < 10 ? "0" + dia : dia}/${mes < 10 ? "0" + mes : mes}/${anio}, ${concat}`;
  }
}
