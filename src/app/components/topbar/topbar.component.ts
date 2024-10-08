import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {


  @ViewChild('config', { static: false }) config!: ElementRef<HTMLDivElement>;
  @ViewChild('home', { static: false }) home!: ElementRef<HTMLDivElement>;
  @ViewChild('history', { static: false }) history!: ElementRef<HTMLDivElement>;

  /**
   *Elementos div
   *
   * @type {HTMLCollectionOf<Element>}
   * @memberof TopbarComponent
   */
  touchMenus!: HTMLCollectionOf<Element>;
  /**
   *Obtiene la URL actual diariamente
   *
   * @readonly
   * @memberof TopbarComponent
   */
  get routeWindow() {
    const arrayUrl = window.location.href.split('/');
    const index = arrayUrl.length - 1;
    return arrayUrl[index].toString();
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.touchMenus = document.getElementsByClassName("touch-menu");

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //opociion predeterminada
        let element = this.home;

        // evita que el tobar se salga de su foco en determinada opción del menu
        switch (this.routeWindow) {
          case 'config':
          case 'bancos-config':
          case 'tasa-personalizada':
          case 'theme':
          case 'info':
            element = this.config;
            break;
          case 'home':
            element = this.home;
            break;
          case 'history':
            element = this.history;
            break;
        }

        this.changeMenu(element.nativeElement);
      }
    });
  }
  /**
   * cambia el hover del menu 
   * @param menu elemto
   */
  changeMenu(menu: HTMLDivElement) {

    //elimina   hover
    for (let i = 0; i < this.touchMenus.length; i++) {
      this.touchMenus[i].classList.remove("touch-menu-hover");
      this.touchMenus[i].classList.add("touch-menu-default");
    }
    //agregg hover
    menu.classList.remove("touch-menu-default");
    menu.classList.add("touch-menu-hover");
  }
}