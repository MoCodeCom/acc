import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'match'
})
export class MatchPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
