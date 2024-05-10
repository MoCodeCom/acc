
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbAlertConfig, NgbCalendar, NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CredoraxService } from '../services/processor/credorax.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  msg:any;
  constructor(ngbAlertConfig: NgbAlertConfig, private credorexService:CredoraxService){

  }
  ngOnInit(): void {

  }

  processors(){
    window.location.reload();
  }

  onAccess(){
    this.credorexService.refresh();
  }




}
