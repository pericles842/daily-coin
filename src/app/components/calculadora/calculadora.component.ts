import { Component, OnInit } from '@angular/core';

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
   *Total de la suema 
   *
   * @type {string}
   * @memberof CalculadoraComponent
   */
  sum_of_box: string = '0';

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
          label: '/',
          class: ' bg-primary ',
          value: 'dividir'
        },
        {
          label: '*',
          class: 'bg-primary ',
          value: 'multiplicar'
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
          label: '+',
          class: ' bg-primary ',
          value: 'sumar'
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
          label: '=',
          class: ' bg-primary ',
          value: 'igual'
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
      ]
    ]
  }

  concatNumber(button: string) {
    //*validación para primera entrada

    //si es 0 y s diferene a n numero  retorna 
    if (this.sum_of_box == '0' && isNaN(parseInt(button))) return
    //si es sero y es igual a un numero limpia
    if (this.sum_of_box == '0' && !isNaN(parseInt(button))) this.sum_of_box = "";


    if (this.special_characters[button]) {
      //if (this.sum_of_box.indexOf(button)) return

      //*validacion para borrar y limpiar
      if (typeof this.special_characters[button] == 'function') {
        const action = this.special_characters[button];

        action();
        if (this.sum_of_box == "") this.sum_of_box = "0"
        return
      } else button = this.special_characters[button]
    }


    this.sum_of_box = this.sum_of_box + button;
  }
}
