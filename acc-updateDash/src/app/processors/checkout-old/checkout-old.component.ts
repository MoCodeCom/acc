import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-old',
  templateUrl: './checkout-old.component.html',
  styleUrl: './checkout-old.component.css'
})
export class CheckoutOldComponent implements OnInit{
  constructor(private http:HttpClient){}
  ngOnInit(): void {

    /*
    this.http.post("https://api.checkout.com/payments",
    {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 52B7F348CFA448B37528C9F63F6AF09E'
      }
    })
    .subscribe(result => {
      console.log(result);
    });
    */
    /*
    Public API key ID
    52B7F348CFA448B37528C9F63F6AF09E

    Public API key
    pk_sd5fr47pwdfcczsu5ngxfkym6mu
    https://www.altras.co.uk - 4829 (ID: pc_4sf4nku2utpuvezgx3xxpmxf7a)
    */
  }

  
}
