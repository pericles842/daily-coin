import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {


  get touchStyle() {
    let touch_menu_default = {
      padding: '10px 0',
      margin: '5px 0',
      transition: ' 0.5s',
    }

    let touch_menu = {
      "border-radius": " 5px",
      "background-color": " var(--primary-color-text)",
      color: "var(--primary-color)",
      padding: "10px 10%",
      margin: "5px 0",
      transition: " 0.5s",
    }
    return ''
  }
}
