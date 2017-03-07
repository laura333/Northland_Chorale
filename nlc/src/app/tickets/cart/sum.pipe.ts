import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
  transform(value: number, multiples: string): number {
    let quantity = parseFloat(multiples);
    return quantity * value;
  }
}
