import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment, environmentLocal } from 'environment';
import { Observable, forkJoin } from 'rxjs';
import { BankingRole } from '../enum/entiesBanking';
import { Bank } from '../models/bank';

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
    return this.http.get(environmentLocal.url + 'api/entity/list-entities')
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
    return this.http.get(environmentLocal.url + 'api/history/get ');
  }
  /**
   *Retorna los precios del banco central
   *
   * @return {*} 
   * @memberof CoinService
   */
  getBankBCV() {
    return this.http.get(environmentLocal.url + `api/entity/get-bcv`);

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
        next: ([lista_bancos, bankingBCV]: [any, any]) => {

          //asignamos el precio de la petición del banco central el la lista de bancos
          const price_bcv_api = bankingBCV.currency[1].price
          lista_bancos[5].price = price_bcv_api

          observer.next({ lista_bancos });
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

}
