import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  /**
   *Botones de la calculadora
   *
   * @type {Array<{ label: string, class: string, value: string, icon?: string }[]>}
   * @memberof CalculadoraComponent
   */
  buttons_calculator: Array<{ label: string, class: string, value: string, icon?: string }[]> = [];

  /**
   *Emite el precio total
   *
   * @memberof CalculadoraComponent
   */
  @Output() total_price = new EventEmitter<string>();

  /**
   *Total de la suema 
   *
   * @type {string}
   * @memberof CalculadoraComponent
   */
  sum_of_box: string = '0';
  touch_igual: boolean = false;

  special_characters: any = {};

  ngOnInit() {
    this.special_characters = {
      'sumar': '+',
      "restar": '-',
      "multiplicar": '*',
      "dividir": "/",
      "del": () => { this.sum_of_box = this.sum_of_box.slice(0, -1) },
      "ac": () => { this.sum_of_box = "0" },
      "igual": "igual"
    }
    this.buttons_calculator = [
      [
        {
          label: 'AC',
          class: ' bg-red-400 text-white ',
          value: 'ac'
        },
        {
          label: '<',
          class: ' bg-red-400 text-white ',
          value: 'del',
          icon: '  '
        },
        {
          label: '+',
          class: ' bg-primary ',
          value: 'sumar'
        }
      ],
      [
        {
          label: '7',
          class: ' bg-primary-reverse ',
          value: '7'
        },
        {
          label: '8',
          class: ' bg-primary-reverse ',
          value: '8',
          icon: ''
        },
        {
          label: '9',
          class: ' bg-primary-reverse ',
          value: '9'
        },
        {
          label: '*',
          class: 'bg-primary ',
          value: 'multiplicar'
        }
      ],
      [
        {
          label: '4',
          class: ' bg-primary-reverse ',
          value: '4'
        },
        {
          label: '5',
          class: ' bg-primary-reverse ',
          value: '5',
          icon: ''
        },
        {
          label: '6',
          class: ' bg-primary-reverse ',
          value: '6'
        },
        {
          label: '/',
          class: ' bg-primary ',
          value: 'dividir'
        }
      ],
      [
        {
          label: '1',
          class: ' bg-primary-reverse ',
          value: '1'
        },
        {
          label: '2',
          class: ' bg-primary-reverse ',
          value: '2',
          icon: ''
        },
        {
          label: '3',
          class: ' bg-primary-reverse ',
          value: '3'
        },
        {
          label: '.',
          class: ' bg-primary ',
          value: '.'
        }
      ],
      [
        {
          label: '0',
          class: ' bg-primary-reverse w-full ',
          value: '0',
          icon: ''
        },
        {
          label: '=',
          class: ' bg-primary ',
          value: 'igual'
        }
      ]
    ]
  }

  concatNumber(button: string) {
    //*validación para primera entrada

    //si es 0 y s diferene a n numero  retorna 
    if (this.sum_of_box == '0' && isNaN(parseInt(button))) return
    //si es sero y es igual a un numero limpia
    if (this.sum_of_box == '0' && !isNaN(parseInt(button))) this.sum_of_box = "";
    // validarcion para limpiar la calculadora || this.touch_igual


    if (this.special_characters[button] && this.special_characters[button] != 'igual') {
      if (/[+\-*\/]/.test(this.sum_of_box)) return

      //*validacion para borrar y limpiar
      if (typeof this.special_characters[button] == 'function') {
        const action = this.special_characters[button];

        action();
        if (this.sum_of_box == "") this.sum_of_box = "0"
        return
      } else button = this.special_characters[button]
    }

    if (this.special_characters[button] == "igual") {
      this.sum_of_box = eval(this.sum_of_box);
      this.total_price.emit(this.sum_of_box)
      this.touch_igual = true
    } else {
      this.sum_of_box = this.sum_of_box + button
      this.touch_igual = false
    }
  }

}
