/**
 *Convertir fecha
 *
 * @param {*} date
 * @return {*} string 
 * @memberof TasaPersonalizadaComponent
 */
export function dateConvert(date: any) {

  const opciones = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return date.toLocaleString('es', opciones).toString();
}