import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parsePrice'
})
export class ParsePricePipe implements PipeTransform {

  transform(price: any) {
     
    return price.replace(',', ".")
  }

}
