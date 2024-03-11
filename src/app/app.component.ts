import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { environment } from 'environment';
import { MessageService } from 'primeng/api';
import { dateConvert } from './functions/date';
import { AppConfigService } from './services/app-config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sessionDate: Date = new Date();
  /**
   *Términos y condiciones
   *
   * @type {Boolean}
   * @memberof AppComponent
   */
  contrato: Boolean = false;
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
    private router: Router,
    private appConfigService: AppConfigService
  ) { }



  ngOnInit(): void {
     
    
    localStorage.setItem('timeSession', dateConvert(this.sessionDate))
    if (localStorage.getItem('contract') === null || Number(localStorage.getItem('contract')) === 0) this.contrato = true
    // this.confirmationNotificación()
    this.updatesVersion()
  }

  /**
   *Busca actualizaciones en base de datos 
   *
   * @memberof AppComponent
   */
  updatesVersion() {
    this.appConfigService.getVersion().subscribe({
      next: (res: any) => {

        // variables de versiones
        let sqlVersion: number = parseInt(res.version.replace('.', ''));
        let versionDc: number = parseInt(environment.version.replace('.', ''));

        //ejecución del proceso

        if (sqlVersion != versionDc) {
          this.updates = true
        } else {
          this.updates = false
        }

        }, error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Error al cargar la version', detail: 'Por favor refrescar la pagina' });
        }
      })
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
  /**
   *Guarda los terminos y condiciones
   *
   * @memberof AppComponent
   */
  guardarTerminos() {
    localStorage.setItem('contract', '1')
    this.contrato = false;
  }
  moveContract() {
    this.router.navigate(['config/info'])
    this.contrato = false
  }
}
