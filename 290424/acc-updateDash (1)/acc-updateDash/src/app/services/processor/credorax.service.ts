import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredoraxService {

  constructor(private http:HttpClient) { }
  Subjec_message = new BehaviorSubject<any>({});

  async delete_row_auto(){
    await this.http.delete('http://localhost:9000/processor/credorax/deletesamecredorax').subscribe(result =>{
      this.Subjec_message.next(result);
    });
  }
  
}
