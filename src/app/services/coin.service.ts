import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { BankingRole } from '../enum/entiesBanking';


@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(
    private http: HttpClient,
  ) { }
  /**
   *Obtiene todas las entidades bancarias disponible
   *
   * @memberof CoinService
   */
  listBankingEntities() {
    return this.http.get(environment.url + 'api/v1/dollar/exchangemonitor')
  }
  /**
   *Obtiene una entidad bancaria
   *
   * @memberof CoinService
   */
  getBanking(entity: BankingRole) {
    return this.http.get(environment.url + `api/v1/dollar/unit/${entity}`)
  }
}
