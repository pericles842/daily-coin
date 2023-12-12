import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelHeader'
})
export class LabelHeaderPipe implements PipeTransform {
  /**
   *Retorna un label según  se encuentre
   *
   * @param {string} value
   * @return {*}  {string}
   * @memberof LabelHeaderPipe
   */
  transform(value: any,): string {

    if (!value as boolean) return 'Daily Coin';
    
    switch (value) {
      case 'home':
        return 'Home'
        break;
      case 'history':
        return 'Historial'
        break;
      case 'config':
        return 'Configuración'
        break;
      case 'bancos-config':
        return 'Bancos'
        break;
      case 'theme':
        return 'Temas '
        break;
      case 'tasa-personalizada':
        return 'Tasa personalizada'
        break;
      case 'info':
        return 'Información'
        break;
      default:
        return 'Daily Coin'
        break;
    }
  }

}
