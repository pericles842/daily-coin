import { Component, OnInit } from '@angular/core';
import { dateConvert } from './functions/date';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { MessageService } from 'primeng/api';
import { filter, interval } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sessionDate: Date = new Date();
  /**
   *booleano que define si existen actualizaciones
   *
   * @type {boolean}
   * @memberof AppComponent
   */
  updates: boolean = false

  constructor(
    private readonly swUpdate: SwUpdate,
    private messageService: MessageService,
  ) {
    setInterval(() => {
      this.checkForUpdates()
    }, 6000) //6s
  }



  ngOnInit(): void {

    localStorage.setItem('timeSession', dateConvert(this.sessionDate))

  }
  /**
   *Busca actualizaciones
   *
   * @memberof AppComponent
   */
  checkForUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then((event) => {
        
        if (!this.updates) {
          this.updates = event
        } else return
      });
    }
  }
  /**
   *refresca la pagina 
   *
   * @memberof AppComponent
   */
  activateUpdate() {
    window.location.href = window.location.href;
  }
}
