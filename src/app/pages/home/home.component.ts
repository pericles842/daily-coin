import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConversionCoinComponent } from 'src/app/components/conversion-coin/conversion-coin.component';
import { StatusCoinComponent } from 'src/app/components/status-coin/status-coin.component';
import { BankingRole } from 'src/app/enum/entiesBanking';
import { Tutorial } from 'src/app/interfaces/tutorial';
import { Bank } from 'src/app/models/bank';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService]
})
export class HomeComponent implements OnInit {

  @ViewChild('confirmPopupRef') confirmPopupRef: any;
  @ViewChild('status_coin') status_coin!: StatusCoinComponent;
  @ViewChild('conversion_coin') conversion_coin !: ConversionCoinComponent;



  entidadBancaria!: BankingRole

  bancoActual: Bank = new Bank();

  itemContendTutorial: Tutorial = {
    header: '',
    contend: '',
    id: 0
  }

  constructor(

    private messageService: MessageService,
    public appConfigService: AppConfigService,
    private confirmationService: ConfirmationService,

  ) { }

  ngOnInit() {
    this.entidadBancaria = BankingRole.bcv;

  }

  /**
   *Data del tutorial
   *
   * @readonly
   * @memberof HomeComponent
   */
  get getDataTutorial() {
    return this.appConfigService.contend_tutorial[this.appConfigService.position_tutorial];
  }

  inactiveScrollBody() {
    document.body.style.overflow = 'hidden';
  }
  /**
   *Captura el banco actualS
   *
   * @param {Bank} Bank Banco
   * @memberof AppComponent
   */
  currentBankingEntity(Bank: Bank) {
    this.bancoActual = Bank
  }
  /**
   *Valida si se hizo el toturial, ademas de comenzarlo si no es asi
   *
   * @memberof HomeComponent
   */
  validateTutorial() {

    setTimeout(() => {
      if (!localStorage.getItem('passTutorial')) localStorage.setItem('passTutorial', '0')

      if (parseInt(localStorage.getItem('passTutorial') as string) == 0) {
        this.runTutorial()
        this.appConfigService.tutorial = true

      } else this.appConfigService.tutorial = false
    }, 1000)
  }


  /**
   *inicia el principio del tutorial
   *
   * @memberof HomeComponent
   */
  runTutorial() {
    let dataTutorial: Tutorial = this.getDataTutorial
    this.openModalRunTutorial(dataTutorial, 1)

  }

  finalizeTutorial() {
    this.appConfigService.position_tutorial = 0
    this.appConfigService.tutorial = false
    localStorage.setItem('passTutorial', '1')
  }
  /**
   *
   *
   * @param {Tutorial} dataTutorial objeto del tutorial actual
   * @param {number} positionModal position del arreglo que determina que paso a seguir del tutorial
   * @memberof HomeComponent
   */
  openModalRunTutorial(dataTutorial: Tutorial, positionModal: number) {

    if (positionModal == 5) positionModal = 1

    let elementDiv = document.querySelector(`#section_tutorial_${positionModal.toString()}`)

    this.confirmationService.confirm({
      target: elementDiv as EventTarget,
      message: dataTutorial.contend,
      header: dataTutorial.header,
      closeOnEscape: true,
      icon: 'pi pi-check',
      acceptLabel: 'Siguiente',
      rejectLabel: 'Atrás',
      accept: () => {
        this.confirmationService.close()

        setTimeout(() => { this.nextTutorial() }, 500);
      },
      reject: () => {
        this.confirmationService.close()

        setTimeout(() => { this.beforeTutorial() }, 500);
      }
    });
  }

  /**
   *siguiente paso del tutorial
   *
   * @memberof HomeComponent
   */
  nextTutorial() {
    this.appConfigService.position_tutorial++

    //*Finaliza el tutorial
    if (this.appConfigService.position_tutorial == 6) return this.finalizeTutorial()

    let positionTutorial = this.appConfigService.position_tutorial

    //* section_tutorial_ + un  numero
    this.removeClassTutorial(positionTutorial - 1)
    this.addClassTutorial(positionTutorial)

    this.openModalRunTutorial(this.getDataTutorial, positionTutorial)

  }
  /**
   * paso atrás del tutorial
   *
   * @memberof HomeComponent
   */
  beforeTutorial() {


    if (this.appConfigService.position_tutorial == 0) {

      this.appConfigService.position_tutorial = 0
    } else {
      
      this.appConfigService.position_tutorial--

    }


    //*Finaliza el tutorial

    let positionTutorial = this.appConfigService.position_tutorial == 0 ? 1 : this.appConfigService.position_tutorial

    //* section_tutorial_ + un  numero
    this.removeClassTutorial(positionTutorial + 1)
    this.addClassTutorial(positionTutorial)

    this.openModalRunTutorial(this.getDataTutorial, positionTutorial)
  }
  /**
   *Elimina la case que reslta el item al tuturial
   *
   * @param {number} positionTutorial
   * @memberof HomeComponent
   */
  removeClassTutorial(positionTutorial: number) {
    const elementDiv = document.querySelector(`#section_tutorial_${positionTutorial}`)
    if (elementDiv) elementDiv.classList.remove(`tutorial-content`)
  }
  /**
   *Agregar una clase ara resaltar el item del tutorial
   *
   * @param {number} positionTutorial numero al concatenar para el query selector 
   * @memberof HomeComponent
   */
  addClassTutorial(positionTutorial: number): void {
    const elementDiv = document.querySelector(`#section_tutorial_${positionTutorial}`)
    if (elementDiv) elementDiv.classList.add(`tutorial-content`)
  }
}
