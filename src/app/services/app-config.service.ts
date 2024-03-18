
import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { environmentLocal } from 'environment';
import { Tutorial } from '../interfaces/tutorial';
import { Dialog } from 'primeng/dialog';


@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  @ViewChild('dialog_tutorial') dialog_tutorial!: Dialog;

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
  /**
   *Comenzar tutorial
   *
   * @type {boolean}
   * @memberof AppConfigService
   */
  tutorial: boolean = false
  /**
   *indice del tutorial a medida que esta avanzado 
   *
   * @type {number}
   * @memberof AppConfigService
   */
  position_tutorial: number = 0;
  /**
   *clase para resaltar elemeto
   *
   * @type {string}
   * @memberof AppConfigService
   */
  focus_tutorial_class: string = ' tutorial-overlay '

  /**
   *data de tutorial
   *
   * @type {Tutorial[]}
   * @memberof AppConfigService
   */
  contend_tutorial: Tutorial[] = [
    {
      id: 0,
      header: 'Bienvenido a Daily Coin',
      contend: 'Te enseñaremos utilizar nuestra app'
    },
    {
      id: 1,
      header: 'Tarjeta informativa',
      contend: `Descubre el precio actual del dólar además de la información según la entidad que elijas,
       así como poder cambiar de entidad.`
    },
    {
      id: 2,
      header: 'Panel de accesibilidad',
      contend: `Consulta el estado actual del dólar por banco y actualizamos las tasas regularmente.
               Comparte fácilmente la información de la tasa a través de WhatsApp.`
    },
    {
      id: 3,
      header: 'Conversion de moneda',
      contend: `Convierte bolívares a dólares y viceversa según tu banco elegido.
               Usa nuestra calculadora integrada para obtener conversiones precisas al instante.`
    },
    {
      id: 4,
      header: 'Monto',
      contend: `Aquí obtendrá el monto total previamente ingresado en dólares o bolívares.
      Si se ha equivocado en el monto, puede ajustarlo aumentándolo o disminuyéndolo.`
    },
    {
      id: 5,
      header: 'Final',
      contend: `Muchas gracias por usar nuestra app`
    }
  ];



}
