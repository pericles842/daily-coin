import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BankingRole } from 'src/app/enum/entiesBanking';
import { Tutorial } from 'src/app/interfaces/tutorial';
import { Bank } from 'src/app/models/bank';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('anchor_tutorial') anchor_tutorial: any;
  @ViewChild('dialog_tutorial') dialog_tutorial!: Dialog;


  entidadBancaria!: BankingRole

  bancoActual: Bank = new Bank();

  viewModal: boolean = false

  itemContendTutorial: Tutorial = {
    header: '',
    contend: '',
    id: 0
  }

  position_modal: { 'left.px': string, 'top.px': string, 'bottom.px': string, 'right.px': string } = {
    'left.px': '100',
    'top.px': '100',
    'bottom.px': '100',
    'right.px': '100'
  }

  constructor(

    private messageService: MessageService,
    public appConfigService: AppConfigService,

  ) { }

  ngOnInit() {
    this.entidadBancaria = BankingRole.bcv;

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.validateTutorial()

    }, 1000)


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
   *valida si se hizo el tutorial
   *
   * @memberof HomeComponent
   */
  validateTutorial() {

    if (!localStorage.getItem('passTutorial')) localStorage.setItem('passTutorial', '0')

    if (parseInt(localStorage.getItem('passTutorial') as string) == 0) {
      this.appConfigService.tutorial = true
      this.runTutorial()

    } this.appConfigService.tutorial = false
  }

  /**
   *Valida ta vairbale tutorial
   *
   * @readonly
   * @memberof HomeComponent
   */
  get start_tutorial() {
    return this.appConfigService.tutorial
  }
  /**
   *Abre lo necesario del tutorial
   *
   * @memberof HomeComponent
   */
  runTutorial() {

    let dataTutorial: Tutorial = this.appConfigService.contend_tutorial[this.appConfigService.position_tutorial];



    this.openModalRunTutorial(dataTutorial, this.anchor_tutorial.elementRef)

  }

  /**
   *Configura la posision del modal
   *
   * @param {Tutorial} dataTutorial
   * @memberof HomeComponent
   */
  openModalRunTutorial(dataTutorial: Tutorial, element: ElementRef) {

    const rect = element.nativeElement.getBoundingClientRect();

    this.itemContendTutorial = dataTutorial

    this.position_modal['top.px'] = rect.top
    this.position_modal['bottom.px'] = rect.bottom
    this.position_modal['right.px'] = rect.right
    this.position_modal['left.px'] = rect.left

    //this.dialog_tutorial 
    this.viewModal = true

    console.log(this.position_modal);




  }

}
