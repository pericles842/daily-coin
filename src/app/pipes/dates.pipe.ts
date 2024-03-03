import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDailyCoin'
})
export class DatesPipe implements PipeTransform {

  transform(date: string): string {
    let fechaObj = new Date(date);

    // Aplica la transformación manualmente
    let dia = fechaObj.getDate();
    let mes = fechaObj.getMonth() + 1; // Los meses van de 0 a 11, así que necesitas sumar 1
    let año = fechaObj.getFullYear();
    let horas = fechaObj.getHours();
    let minutos = fechaObj.getMinutes();

    // Formatea la fecha en el formato deseado
    return `${this.agregarCeros(dia)}/${this.agregarCeros(mes)}/${año} ${this.agregarCeros(horas)}:${this.agregarCeros(minutos)}`
  }
  agregarCeros(numero: number): string {
    return numero < 10 ? '0' + numero : '' + numero;
  }
} 
