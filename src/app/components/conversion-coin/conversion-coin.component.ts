import { Component, Input, OnInit } from '@angular/core';
import { CurrencyConversion } from 'src/app/models/CurrencyConversion';
import { Bank } from 'src/app/models/bank';

@Component({
  selector: 'app-conversion-coin',
  templateUrl: './conversion-coin.component.html',
  styleUrls: ['./conversion-coin.component.scss']
})
export class ConversionCoinComponent implements OnInit {
  @Input() banco!: Bank;

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

  ngOnInit() {
    setTimeout(() => {

      this.loading = true;
      this.conversionMoney.money_conversion = this.banco.price
      this.moneyConversion(this.banco.price, this.bsToDollar)
    }, 1000);
    
    
    this.loading = false;
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
  }
  /**
   *captura el evento del input y detecta los cambios
   *
   * @param {*} event
   * @memberof ConversionCoinComponent
   */
  onInputChange(event: number) {
    this.moneyConversion(event, this.bsToDollar)
  }
}
