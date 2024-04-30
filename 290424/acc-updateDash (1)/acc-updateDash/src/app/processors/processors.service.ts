import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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


export class ProcessorsService implements OnInit{

  constructor() { }
  ngOnInit(): void {

  }
  countProcessorBehaveior = new BehaviorSubject<number>(0);
  countSystemBehaveior = new BehaviorSubject<number>(0);

  countProcessor(count:number){
    this.countProcessorBehaveior.next(count);
  }

  countSystem(count:number){
    this.countSystemBehaveior.next(count);
  }

}
