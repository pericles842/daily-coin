import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {

  }

  /**
   *Obtiene la url actual
   *
   * @readonly
   * @memberof HeaderComponent
   */
  get getUrlWindow() {

    //todas las rutas donde se va a mostrar el headear
    let pathActual: string[] = [
      'bancos-config',
      'theme',
      'tasa-personalizada',
      'info',
      'config',
      'history'
    ];

    const arrayUrl = window.location.href.split('/');
    const index = arrayUrl.length - 1;

    return pathActual.includes(arrayUrl[index]) ? arrayUrl[index].toString() : false
    // return arrayUrl[index] === '' || arrayUrl[index] === 'home' ? false : arrayUrl[index].toString();
  }
  /**
   *al presionar la flecha, se meve a una ruta según donde este
   *
   * @param {string} path
   * @memberof HeaderComponent
   */
  changeRute(path: any) {
    let pathActual: string[] = [
      'bancos-config',
      'theme',
      'tasa-personalizada',
      'info'
    ];

    let newPath = ''

    if (pathActual.includes(path)) {
      newPath = 'config'
    } else if (path == 'config') {
      newPath = 'home'
    } else if (path == 'history') {
      newPath = 'home'
    }

    this.router.navigateByUrl(`/${newPath}`);
  }
}
