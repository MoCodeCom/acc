import { Injectable } from '@angular/core';
interface Country {
	id?: number;
	name: string;
	flag: string;
	area: number;
	population: number;
}
@Injectable({
  providedIn: 'root'
})


export class ProcessorsService {
  COUNTRIES:Country[];
  //collectionSize = COUNTRIES.length;
  constructor() { }

  seedData(){
    return ;
  }
}
