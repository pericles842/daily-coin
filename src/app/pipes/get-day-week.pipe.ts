import { Pipe, PipeTransform } from '@angular/core';
/**
 *Obtened un dia de la semana en base a uun numero
 *
 * @export
 * @class GetDayWeekPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'getDay'
})

export class GetDayWeekPipe implements PipeTransform {

  transform(keyWeek: number): string {

    const DAYS: any = {
      0: "Domingo",
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado"
    }
    return DAYS[keyWeek];
  }

}
