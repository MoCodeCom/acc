import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isThisISOWeek } from 'date-fns';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  subject_search_system = new BehaviorSubject<any>({message:'no data'});
  subject_search_processor = new BehaviorSubject<any>({message:'no data'});
  subject_message = new BehaviorSubject<any>({message:'no data'});
  subject_get_recon_data = new BehaviorSubject<any>({});//recon processor
  subject_get_recon_system = new BehaviorSubject<any>({});// recon system

  constructor(private http:HttpClient) { }
/*
  async search_recon_system(data){
    await this.http.get(`http://localhost:9000/processor/credorax/searchcredorexsystem/${data}`).subscribe(result =>{
      this.subject_search_system.next(result);
    });
  }*/

  async search_recon_processor(data,table_name){//----------------->work
    if(table_name === 'credorex_recon'){
      await this.http.get(`http://localhost:9000/processor/credorax/searchprocessor/${data}?table=${table_name}`).subscribe(result =>{
      this.subject_search_processor.next(result);
    });
    }else if(table_name === 'system_recon'){
      await this.http.get(`http://localhost:9000/processor/credorax/searchprocessor/${data}?table=${table_name}`).subscribe(result =>{
      this.subject_search_system.next(result);
    });
    }
    
  }



  async getReconDataOnDate(data, column){
    await this.http.get(`http://localhost:9000/processor/credorax/getrecondate/${data}?column=${column}`).subscribe(result =>{
      this.subject_message.next(result['results']);
      
    });
  }

  //=============> get reconcililation plan 2
  async get_recon(table_name){//----------------------->work
    if(table_name === 'credorex_recon'){
      await this.http.get(`http://localhost:9000/processor/credorax/getreconcredorextbls?table=${table_name}`).subscribe(result =>{
      this.subject_get_recon_data.next(result['result'][0]);
      
    });
    }else if(table_name === 'system_recon'){
      await this.http.get(`http://localhost:9000/processor/credorax/getreconcredorextbls?table=${table_name}`).subscribe(result =>{
        this.subject_get_recon_system.next(result['result'][0]); 
        
      });
    }
    
  }

  //Formatting date 
  formatDate(date:string){
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2,'0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  //===============> matching
  async get_match(id, table_name){ //---------------------->work
    await this.http.delete(`http://localhost:9000/processor/credorax/deleterowrecon/${id}?table=${table_name}`).subscribe(result =>{
      console.log(result);
    });
  }
}
