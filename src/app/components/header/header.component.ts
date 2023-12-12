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

    const arrayUrl = window.location.href.split('/');
    const index = arrayUrl.length - 1;

    return arrayUrl[index].toString();
  }
  /**
   *te mueve a una ruta:)
   *
   * @param {string} path
   * @memberof HeaderComponent
   */
  changeRute(path: string) {
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
