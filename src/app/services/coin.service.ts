import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { environment } from 'environment';
import { environmentLocal } from 'environment';
import { BankingRole } from '../enum/entiesBanking';
import { Bank } from '../models/bank';
import { monthsInQuarter } from 'date-fns';
import { Months } from '../enum/Months';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  /**
   *Lista de bancos configurables
   *
   * @type {Ban}
   * @memberof Coi as anyService
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
    return this.http.get(environment.url + 'api/v1/dollar?page=exchangemonitor')
  }
  /**
   *Obtiene una entidad bancaria
   *
   * @memberof CoinService
   */
  getBanking(entity: BankingRole) {
    return this.http.get(environment.url + `api/v1/dollar?page=${entity}`);
  }
  /**
   *historial de los precios del dolar en la semana
   *
   * @memberof CoinService
   */
  historyEntities() {
    return this.http.get(environmentLocal.url + 'api/history/get ');
  }
  /**
   *Retorna los precios del banco central
   *
   * @return {*} 
   * @memberof CoinService
   */
  getBankBCV() {
    return this.http.get(environment.url + `api/v1/dollar?page=bcv`);

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

          //precio actualizado
          newBankingList.bcv.price = bankingBCV.monitors.usd.price
          newBankingList.bcv.last_update = this.transformDate(date, time)

          observer.next({
            newBankingList,
          });
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
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
  transformDate(date: string, concat: string) {

    //convertimos array
    let dateToArray = date.split(" ")


    //contenemos
    let dateToString = `${dateToArray[1]}/${Months[dateToArray[3] as any]}/${dateToArray[5]} `;

    return dateToString + ' ' + concat

  }
  /**
   *obtiene la tasa del banco central
   *
   * @return {*} BCV
   * @memberof CoinService
   */
  getBankDailyCoinBcv() {

    return new Observable((observer) => {

      let newBankingList: any = {}

      const listBankingObservable = this.listBankingEntities();
      const bcvObservable = this.getBankBCV();

      forkJoin([listBankingObservable, bcvObservable]).subscribe({
        next: ([banking, bankingBCV]: [any, any]) => {
          newBankingList = banking.monitors;

          let { date, time } = bankingBCV.datetime;

          //precio actualizado
          newBankingList.bcv.price = bankingBCV.monitors.usd.price
          newBankingList.bcv.last_update = this.transformDate(date, time)

          observer.next({
            bank: newBankingList.bcv
          });
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }
}
