import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { table } from 'console';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  constructor(private http:HttpClient) { }
  
  http_delete_message = new BehaviorSubject<object>({message:''});
  http_generate_message = new BehaviorSubject<object>({message:''});
  http_delete_all_data_message = new BehaviorSubject<object>({message:''});

  ngOnInit(): void {
    this.http_generate_message.next({});
    this.http_delete_message.next({});
  }
  generateTable(table_name){
    if(table_name === 'credorex')
      this.http.get('http://localhost:9000/creatcredorextbl').subscribe(result => {
        this.http_generate_message.next(result);
    })
    else if(table_name === 'cp'){
      this.http.get('http://localhost:9000/createcptbl').subscribe(result =>{
        this.http_generate_message.next(result);
      })
    }
    else if(table_name === 'recon_credorex'){
      this.http.get('http://localhost:9000/createreconcredorex').subscribe(result =>{
        this.http_generate_message.next(result);
      })
    }
    else if(table_name === 'credorex_index'){
      this.http.get('http://localhost:9000/createcredorexindex').subscribe(result =>{
        this.http_generate_message.next(result);
      })
    };
  }


  deleteTable(table_name){
    if(table_name === 'credorex'){
      this.http.delete('http://localhost:9000/deletcredorextbl').subscribe(result => {
        this.http_delete_message.next(result);
    })}
    else if(table_name === 'cp'){
      this.http.delete('http://localhost:9000/deletecptbl').subscribe(result =>{
        this.http_delete_message.next(result);
      });
    }
    else if(table_name === 'recon_credorex'){
      this.http.delete('http://localhost:9000/deletereconcredorex').subscribe(result =>{
        this.http_delete_message.next(result);
      })
    }
    else if(table_name === 'credorex_index'){
      this.http.delete('http://localhost:9000/deletecredorexindex').subscribe(result =>{
        this.http_delete_message.next(result);
      })
    };
  }

  async deleteAllData(table_name){
    if(table_name === 'recon_credorex'){
      await this.http.delete('http://localhost:9000/deleteallreconcredorex').subscribe(result =>{
        this.http_delete_all_data_message.next(result);
      })
    }else if(table_name === 'cp'){
      await this.http.delete('http://localhost:9000/deleteallcpcredorex').subscribe(result =>{
        this.http_delete_all_data_message.next(result);
      })
    }else if(table_name === 'credorex_index'){
      await this.http.delete('http://localhost:9000/deleteallcredorexindex').subscribe(result =>{
        this.http_delete_all_data_message.next(result);
      })
    }
    else{
      await this.http.delete('http://localhost:9000/deleteallcredorex').subscribe(result =>{
        this.http_delete_all_data_message.next(result);
      })
    }
  }


  
}
