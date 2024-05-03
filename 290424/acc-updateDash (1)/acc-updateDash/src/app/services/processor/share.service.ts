import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http:HttpClient) {}
  Subject_message = new BehaviorSubject<any>({});
  Subject_table_date = new BehaviorSubject<any>({})

  async register(table_name){
    await this.http.post(`http://localhost:9000/processor/credorax/postregister?processor=${table_name}`,{
      message:'register is done'
    }).subscribe(result =>{
      this.Subject_message.next(result);
      this.Subject_table_date.next(result);
    });
  }
}
