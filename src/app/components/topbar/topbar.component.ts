import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

touchMenus = document.getElementsByClassName("touch-menu");

get routewindow(){
  return window.location.href
}

  changeMenu(menu: HTMLDivElement) {
     
    for (let i = 0; i < this.touchMenus.length; i++) {
      this.touchMenus[i].classList.remove("touch-menu-hover");
      this.touchMenus[i].classList.add("touch-menu-default");
    }

    menu.classList.remove("touch-menu-default");
    menu.classList.add("touch-menu-hover");
  }
}
