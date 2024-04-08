import { Component, inject } from '@angular/core';
import { NgbAlertConfig, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  today = inject(NgbCalendar).getToday();
	model: NgbDateStruct;
	date: { year: number; month: number };
 
  constructor(ngbAlertConfig: NgbAlertConfig) {
   
  }
}
