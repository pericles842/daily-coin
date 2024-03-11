import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CurrencyConversion } from 'src/app/models/CurrencyConversion';
import { Bank } from 'src/app/models/bank';

@Component({
  selector: 'app-conversion-coin',
  templateUrl: './conversion-coin.component.html',
  styleUrls: ['./conversion-coin.component.scss']
})
export class ConversionCoinComponent implements OnInit, OnChanges {

  @Input() banco!: Bank;
  modal_calculator: boolean = false

  /**
   *Objeto conversor
   *
   * @type {CurrencyConversion}
   * @memberof ConversionCoinComponent
   */
  conversionMoney: CurrencyConversion = new CurrencyConversion();

  /**
   *Valida si esta en bolivares a dólares o dólares a bolivares
   *
   * @type {boolean}
   * @memberof ConversionCoinComponent
   */
  bsToDollar: boolean = true;
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    public elementRef: ElementRef
  ) { }
  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes["banco"].currentValue?.key !== changes["banco"].previousValue?.key) {

      if (!this.loading) {
        this.conversionMoney.money_conversion = this.banco.price
        this.loading = true;
      }

      this.moneyConversion(this.conversionMoney.money_conversion, this.bsToDollar)
    }
  }
  /**
   *Realiza la conversion de dollar a bolivares y diversa
   *
   * @param {boolean} [bsToDollar=true] se trabajara de bolivares a dólares en caso de true
   * @param {number} money
   * @memberof ConversionCoinComponent
   */
  moneyConversion(money: number, bsToDollar: boolean) {

    if (bsToDollar) {
      this.conversionMoney.total = parseFloat((money / this.banco.price).toFixed(2));
    } else {
      this.conversionMoney.total = parseFloat((money * this.banco.price).toFixed(2));
    }

  }
  /**
   *Cambia el campo de bs a dollar y diversa
   *
   * @memberof ConversionCoinComponent
   */
  changeCurrency() {
    this.bsToDollar = !this.bsToDollar
    this.conversionMoney.currency = this.bsToDollar ? '$' : 'Bs';
    this.moneyConversion(this.conversionMoney.money_conversion, this.bsToDollar)

    this.messageService.add({ severity: 'info', summary: `Haz cambiado de ${!this.bsToDollar ? 'Dólares' : 'Bolivares'} a ${this.bsToDollar ? 'Dólares' : 'Bolivares'}  `, detail: '' });

    setTimeout(() => {
      this.messageService.clear();
    }, 1900);
  }
  /**
   *captura el evento del input y detecta los cambios
   *
   * @param {*} event
   * @memberof ConversionCoinComponent
   */
  onInputChange(event: number | string) {

    this.moneyConversion(event as number, this.bsToDollar)
  }
  copyContent() {
    navigator.clipboard.writeText(this.conversionMoney.total.toString() + this.conversionMoney.currency);
    this.messageService.add({ severity: 'success', summary: '', detail: 'Copiado con éxito' });

    setTimeout(() => {
      this.messageService.clear();
    }, 800);
  }
  /**
   *Aumenta o disminuye en 1  
   *
   * @param {boolean} increase
   * @memberof ConversionCoinComponent
   */
  increasePrice(increase: boolean) {

    //si esta en true aumenta de lo contrario disminuye
    increase ? this.conversionMoney.money_conversion++ : this.conversionMoney.money_conversion--;

    // hacemos la conversion 
    this.moneyConversion(this.conversionMoney.money_conversion, this.bsToDollar);
  }
  /**
   *Evento que obtiene el total de la calculadora
   *
   * @param {string} total
   * @memberof ConversionCoinComponent
   */
  calculatorPrice(total: string) {
    this.conversionMoney.money_conversion = parseFloat(total);
    this.moneyConversion(this.conversionMoney.money_conversion, this.bsToDollar)
    this.modal_calculator = false
  }

}
