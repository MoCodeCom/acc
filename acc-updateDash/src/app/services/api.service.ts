import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  generateTable(table_name){
    if(table_name === 'credorex')
      this.http.get('http://localhost:9000/creatcredorextbl').subscribe(result => {
      console.log(result)
    })
    else if(table_name === 'cp'){
      this.http.get('http://localhost:9000/createcptbl').subscribe(result =>{
        console.log(result);
      })
    }
    else if(table_name === 'recon_credorex'){
      this.http.get('http://localhost:9000/createreconcredorex').subscribe(result =>{
        console.log(result);
      })
    };
  }


  deleteTable(table_name){
    if(table_name === 'credorex'){
      this.http.delete('http://localhost:9000/deletcredorextbl').subscribe(result => {
      console.log(result)
    })}
    else if(table_name === 'cp'){
      this.http.delete('http://localhost:9000/deletecptbl').subscribe(result =>{
        console.log(result);
      });
    }
    else if(table_name === 'recon_credorex'){
      this.http.get('http://localhost:9000/deletereconcredorex').subscribe(result =>{
        console.log(result);
      })
    };
  }
  
}
