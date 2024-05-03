import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paysafe-new',
  templateUrl: './paysafe-new.component.html',
  styleUrl: './paysafe-new.component.css'
})
export class PaysafeNewComponent implements OnInit{
  constructor(private http:HttpClient){}
  ngOnInit(): void {
   
    
  }

}
