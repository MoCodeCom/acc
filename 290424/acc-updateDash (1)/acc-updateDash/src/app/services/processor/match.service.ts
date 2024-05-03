import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  subject_search_system = new BehaviorSubject<any>({message:'no data'});
  subject_search_processor = new BehaviorSubject<any>({message:'no data'});
  subject_message = new BehaviorSubject<any>({message:'no data'});

  constructor(private http:HttpClient) { }

  async search_recon_system(data){

    await this.http.get(`http://localhost:9000/processor/credorax/searchcredorexsystem/${data}`).subscribe(result =>{
      this.subject_search_system.next(result);
    });
  }

  async search_recon_process(data){
    await this.http.get(`http://localhost:9000/processor/credorax/searchcredorexprocessor/${data}`).subscribe(result =>{
      this.subject_search_processor.next(result);
    });
  }

  async getReconDataOnDate(data, column){
    await this.http.get(`http://localhost:9000/processor/credorax/getrecondate/${data}?column=${column}`).subscribe(result =>{
      this.subject_message.next(result['results']);
    });
  }

  //Formatting date 
  formatDate(date:string){
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2,'0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
