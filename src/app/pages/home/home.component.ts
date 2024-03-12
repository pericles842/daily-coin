import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ConversionCoinComponent } from 'src/app/components/conversion-coin/conversion-coin.component';
import { StatusCoinComponent } from 'src/app/components/status-coin/status-coin.component';
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

  @ViewChild('dialog_tutorial') dialog_tutorial!: Dialog;
  @ViewChild('status_coin') status_coin!: StatusCoinComponent;
  @ViewChild('conversion_coin') conversion_coin !: ConversionCoinComponent;



  entidadBancaria!: BankingRole

  bancoActual: Bank = new Bank();

  viewModal: boolean = false

  itemContendTutorial: Tutorial = {
    header: '',
    contend: '',
    id: 0
  }

  position_modal: { 'left.px': string, 'top.px': string } = {
    'left.px': '0',
    'top.px': '0'
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
   *valida si se hizo el tutorial
   *
   * @memberof HomeComponent
   */
  validateTutorial() {

    if (!localStorage.getItem('passTutorial')) localStorage.setItem('passTutorial', '0')

    if (parseInt(localStorage.getItem('passTutorial') as string) == 0) {
      this.runTutorial()
      this.appConfigService.tutorial = true

    } else this.appConfigService.tutorial = false
  }


  /**
   *Abre lo necesario del tutorial
   *
   * @memberof HomeComponent
   */
  runTutorial() {
    let dataTutorial: Tutorial = this.getDataTutorial
    let dataModal = { top: '0', left: '0' }
    this.openModalRunTutorial(dataTutorial, dataModal)

  }

  /**
    ABRE Y CONFIGURA LA POSITION DE MODAL
   *
   * @param {Tutorial} dataTutorial
   * @memberof HomeComponent
   */
  openModalRunTutorial(dataTutorial: Tutorial, positionModal: { top: string, left: string }) {



    this.itemContendTutorial = dataTutorial

    this.viewModal = true

    this.position_modal['top.px'] = positionModal.top;
    // this.position_modal['bottom.px'] = rect.bottom
    // this.position_modal['right.px'] = rect.right
    this.position_modal['left.px'] = positionModal.left

    //this.dialog_tutorial 
    this.dialog_tutorial.style = this.position_modal

  }

  nextTutorial() {
    this.appConfigService.position_tutorial++
    this.itemContendTutorial = this.getDataTutorial
    //section_tutorial_1
    //*la idea es obtener dinamicamente los id de los divs
    console.log(this.status_coin.elementRef.nativeElement);

  }

}
