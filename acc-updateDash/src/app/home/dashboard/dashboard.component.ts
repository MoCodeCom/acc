import { Component, OnInit, inject } from '@angular/core';
import { NgbAlertConfig, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ChartsService } from '../../services/charts.service';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

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
  currencyApi:any = {data:{CAD:0.1, EUR:0.1, GBP:0.1}};

  constructor(private charts:ChartsService, 
              private http:HttpClient) {
  }
  ngOnInit(): void {
    this.charts.doughnutChart_dashboard_1("doughnutChart",this.labels, this.data);
    this.currencyData();
    
  }

  async currencyData(){
    await this.http.get('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_e5QEWBoWTP1PPrie8nfvWvIxXMWqdtiHfNkzzSlS&currencies=USD%2CEUR%2CCAD%2CGBP').subscribe(result =>{
      this.currencyApi = result;
      this.charts.barChart('barChart',['CAD','EUR','GBP'],[this.currencyApi.data.CAD, this.currencyApi.data.EUR, this.currencyApi.data.GBP]);
    });
    //await 
  }
}
