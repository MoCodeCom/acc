import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'processorStatement'
})
export class ProcessorStatementPipe implements PipeTransform {

  transform(value: any[]): number {
    if(value.length < 1)return 0;
    return value.reduce((total, item) =>total + parseFloat(item['transaction_amount']),0);
  }

}
