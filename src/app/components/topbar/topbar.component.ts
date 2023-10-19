import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Output() config = new EventEmitter<any>();
  //@Output() pago_movil = new EventEmitter<any>();
  @Output() home = new EventEmitter<any>();
  @Output() calculator = new EventEmitter<any>();
  @Output() history = new EventEmitter<any>();

}
