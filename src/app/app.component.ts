import { Component, OnInit } from '@angular/core';
import { dateConvert } from './functions/date';
import { SwPush, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { MessageService } from 'primeng/api';
import { filter, interval } from 'rxjs';
import { environment } from 'environment';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sessionDate: Date = new Date();

  readonly PUBLIC_KEY: string = environment.notification.publicKey
  readonly PRIVATE_KEY: string = environment.notification.privateKey
  /**
   *booleano que define si existen actualizaciones
   *
   * @type {boolean}
   * @memberof AppComponent
   */
  updates: boolean = false

  constructor(
    private readonly swUpdate: SwUpdate,
    private swPush: SwPush,
    private messageService: MessageService,
  ) {
    setInterval(() => {
      this.checkForUpdates()
    }, 6000) //6s
  }



  ngOnInit(): void {
    localStorage.setItem('timeSession', dateConvert(this.sessionDate))

    //this.confirmationNotificación()

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

  confirmationNotificación(): void {
    const options = {
      serverPublicKey: this.PUBLIC_KEY
    }
    this.swPush.requestSubscription(options).then(sub => {
      const token = JSON.parse(JSON.stringify(sub))

      console.log('MNOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO', token);
    }
    ).catch((error) => {
      console.error(error);
    })
  }
  
}
