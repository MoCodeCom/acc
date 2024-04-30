import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  subject_search_system = new BehaviorSubject<any>({});
  subject_search_processor = new BehaviorSubject<any>({});

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
}
