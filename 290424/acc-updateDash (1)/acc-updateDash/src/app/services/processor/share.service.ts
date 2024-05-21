import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor(private http:HttpClient) {}
  Subject_message = new BehaviorSubject<any>({});
  Subject_table_date = new BehaviorSubject<any>({});
  Subject_count = new BehaviorSubject<any>({});

  //Subject_showStatement = new BehaviorSubject<boolean>(true);

  async register(table_name){
    await this.http.post(`http://localhost:9000/processor/credorax/postregister?processor=${table_name}`,{
      message:'register is done'
    }).subscribe(result =>{
      this.Subject_message.next(result);
      this.Subject_table_date.next(result);
    });
  }

  //to calculate the rows in recon_credorex as system [processor]
  async count_table(processor,table_name){
    //to get the count for account rows in 
    await this.http.get(`http://localhost:9000/processor/counttable?processor=${processor}&id_name=ID_system&table=${table_name}`)
    .subscribe(result =>{
      this.Subject_count.next({res:result['result'][0][0]['COUNT(*)']});
      console.log(result['result'][0][0]['COUNT(*)']);
    });
    
  }

  



  /*
  async showStatementCase(){
    if(this.Subject_showStatement.value === true){
      this.Subject_showStatement.next(false);
    }else{
      this.Subject_showStatement.next(true);
    }
    
  }*/

  
}
