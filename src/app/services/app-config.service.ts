import { Injectable } from '@angular/core';
import { environmentLocal } from 'environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   *Obtiene la version de la app
   *
   * @return {*} 
   * @memberof AppConfigService
   */
  getVersion() {
    return this.http.get(environmentLocal.url + 'api/app-config/get-version')
  }

}
