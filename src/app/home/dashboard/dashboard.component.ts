import { Component, OnInit, inject } from '@angular/core';
import { NgbAlertConfig, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ChartsService } from '../../services/charts.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  cellTemplateId:any;
  public chart:any;
  labels:string[] = ['Fees','Banks','Income'];
  data:number[] = [500000,4250000,1250000];

  constructor(private charts:ChartsService) {
  }
  ngOnInit(): void {
    this.charts.doughnutChart_dashboard_1("doughnutChart",this.labels, this.data);
  }
}
