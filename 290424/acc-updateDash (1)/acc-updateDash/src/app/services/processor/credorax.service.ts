import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredoraxService {

  constructor(private http:HttpClient) { }
  Subject_message = new BehaviorSubject<any>({});
  Subject_statement_list = new BehaviorSubject<any>({});
  Subject_sum_payment = new BehaviorSubject<any>({});
  Subject_sum_fee = new BehaviorSubject<any>({});

  async delete_row_auto(){
    await this.http.delete('http://localhost:9000/processor/credorax/deletesamecredorax').subscribe(result =>{
      this.Subject_message.next(result);
    });
  }

  async get_Payments(processor){
    await this.http.get(`http://localhost:9000/processor/credorax/getpayments?processor=${processor}`).subscribe(result =>{
      this.Subject_statement_list = result['result'][0];
    })
  }

  // sum payment
  async get_sum_payment(processor, curr){
    await this.http.get(`http://localhost:9000/processor/credorax/getsumpayments?processor=${processor}&curr=${curr}`).subscribe(result =>{
      this.Subject_sum_payment.next({res:result['result'][0][0] ,curr:result['currency']});
      //console.log({res:result['result'][0][0] ,curr:result['currency']});
    })
  }

  // sum fees 
  async get_sum_fee(processor,curr,column){
    await this.http.get(`http://localhost:9000/processor/credorax/getsumfees?processor=${processor}&curr=${curr}&fee=${column}`).subscribe(result =>{
      this.Subject_sum_fee.next({res:result['result'][0][0],curr:result['currency'], fee:result['fee']});
    })
  }

  

  
  
}
