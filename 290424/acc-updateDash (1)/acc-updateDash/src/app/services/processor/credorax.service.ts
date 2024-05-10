import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredoraxService implements OnInit{

  constructor(private http:HttpClient) {}
  Subject_message = new BehaviorSubject<any>({});
  Subject_statement_list = new BehaviorSubject<any>({});
  Subject_sum_payment = new BehaviorSubject<any[]>([]);
  Subject_sum_fee = new BehaviorSubject<any>({});
  Subject_refresh = new BehaviorSubject<boolean>(false);
  Subject_refund = new BehaviorSubject<any>({});
  Subject_sum_recon = new BehaviorSubject<any>({});
  Subject_index_statement = new BehaviorSubject<any>({response:'no_data'})

  ngOnInit(): void {
  }

  async delete_row_auto(){
    await this.http.delete('http://localhost:9000/processor/credorax/deletesamecredorax').subscribe(result =>{
      this.Subject_message.next(result);
    });
  }

  // payment
  async get_Payments(processor){
    await this.http.get(`http://localhost:9000/processor/credorax/getpayments?processor=${processor}`).subscribe(result =>{
      //this.Subject_statement_list = result['result'][0];
      this.Subject_statement_list.next(result['result'][0]);
    })
  }

  // sum payment
  async get_sum_payment(processor, curr:any[]){
    const dataArr:{res:string, curr:string}[] =[];
    for(let i = 0;i<curr.length;i++){
      await this.http.get(`http://localhost:9000/processor/credorax/getsumpayments?processor=${processor}&curr=${curr[i]}`)
      .subscribe(result =>{
         dataArr.push({res:result['result'][0], curr:result['currency']})
      });
    }
    this.Subject_sum_payment.next(dataArr);
    
  }

  // sum fees 
  async get_sum_fee(processor,curr,column){
    await this.http.get(`http://localhost:9000/processor/credorax/getsumfees?processor=${processor}&curr=${curr}&fee=${column}`).subscribe(result =>{
      this.Subject_sum_fee.next({res:result['result'][0][0],curr:result['currency'], fee:result['fee']});
    });
  }

  // sum refund
  async get_sum_refund(processor, curr){
    await this.http.get(`http://localhost:9000/processor/credorax/getsumrefund?processor=${processor}&curr=${curr}`).subscribe(result =>{
      this.Subject_refund.next({res:result['result'][0], curr:result['currency']});
    });
  }

  async refresh(){
    await this.Subject_refresh.next(true);    
  }

  /**************************************** Reconciliation ************************ */

  // sum reconciliation
  async get_sum_recon(db, curr){
   
    await this.http.get(`http://localhost:9000/processor/credorax/getsumsystem?processor=${db}&curr=${curr}`).subscribe(result =>{
      this.Subject_sum_recon.next({res:result['result'][0], curr:result['currency']});
    });
  }

    //**************************************** index ********************************** */
  // get index statement
  async get_index(processor, date, curr){
    await this.http.get(`http://localhost:9000/processor/credorax/getindex?processor=${processor}&date=${date}&curr=${curr}`).subscribe(result =>{
      this.Subject_index_statement.next({res:result['result'][0], curr:result['curr']});
    });
    
  }




  

  
  
}
