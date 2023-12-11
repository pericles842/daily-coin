import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-theme',
  templateUrl: './config-theme.component.html',
  styleUrls: ['./config-theme.component.scss']
})
export class ConfigThemeComponent implements OnInit {
  /**
   *Temas para la configuración 
   *
   * @type {any[]}
   * @memberof ConfigThemeComponent
   */
  temas: any[] = [
    {
      title: 'Tema claro',
      bgColor: 'bg-teal-400 ',
      textColor: 'text-teal-400',
      path: 'light',
      active: false
    },
    {
      title: 'Tema Oscuro',
      bgColor: 'bg-gray-800',
      textColor: 'text-color',
      path: 'black',
      active: false
    },
    {
      title: 'Tema Purpura',
      bgColor: 'bg-indigo-400',
      textColor: 'text-indigo-400',
      path: 'purple',
      active: false
    }
  ]

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('configTheme') as string) !== undefined) return
    let themeConfig = JSON.parse(localStorage.getItem('configTheme') as string);
    let indexConfig = this.temas.findIndex(tema => tema.path == themeConfig.path)

    this.selectTheme(indexConfig)

  }
  /**
   *Selecciona y cambia un tema
   *
   * @param {number} index
   * @memberof ConfigThemeComponent
   */
  selectTheme(index: number) {
    this.temas.forEach(tema => {
      if (tema.active) tema.active = false;
    })

    this.temas[index].active = true

    localStorage.setItem('configTheme', JSON.stringify(this.temas[index]))


    this.assignThemeInHTML(index)

  }

  /**
   *Asigna el tema al index.html
   *  
   * @param {number} index del arreglo de temas
   * @memberof ConfigThemeComponent
   */
  assignThemeInHTML(index: number) {
    //obtengo los links HTML 
    let linksHTML = document.documentElement.getElementsByTagName('link')

    //extraigo el primero y lo connvierto en un arreglo
    let link = linksHTML[0].href.split('/');

    const indexUrl = link.length - 2;

    //remplazo el path
    link[indexUrl] = this.temas[index].path;

    //trasformo array en striig
    const urlTheme = link.join('/')

    linksHTML[0].href = urlTheme
  }
}
