import { Injectable, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class ChartsService{


  constructor() {

  }


  doughnutChart_dashboard_1(context:string,labels:string[], data:number[]){

    var chart = new Chart(context,{
      type:'doughnut',
      data:{
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }

    });
  }



}
