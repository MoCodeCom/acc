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

  barChart(context:string,labels:any=['CAD','EUR','GBP'], dataCurr:any=[0.1,0.1,0.1]){
    var chart = new Chart('barChart',{
      type:'bar',
      data :{
        labels: labels,
        datasets: [{
          label: 'Currencies',
          data: dataCurr,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(153, 102, 255, 0.2)',
    
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1
        }]},
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }

    });
    
    


  
  }



}
