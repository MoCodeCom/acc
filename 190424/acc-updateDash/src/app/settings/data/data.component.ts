import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  
  tblAlrtClass=false;
  table_name = '';

  //------------- alerts ------------------------\\
  alert_delete_message:any=null;
  alert_generate_message:any=null;
  //---------------------------------------------\\
  constructor(private api:ApiService,
              
  ){}
  
  onGenerateTable(tableName){
    this.tblAlrtClass = true;
    this.table_name = tableName;
  }

  onGenetateTableAlert(){
    
      this.api.generateTable(this.table_name);
      this.tblAlrtClass = false;
      this.api.http_generate_message.subscribe(result =>{
        this.alert_generate_message = result['message'];

        setTimeout(() => {
          this.alert_generate_message = null;
        }, 4000);
      });
      this.table_name = '';
  }

  cancelGenerateTableAlert(){
      this.tblAlrtClass = false;

  }


  onDeleteTable(tableName){
    this.api.deleteTable(tableName);
    this.api.http_delete_message.subscribe(result =>{
      this.alert_delete_message = result['message'];

      setTimeout(() => {
        this.alert_delete_message = null;
      }, 4000);
    });
  }

  onDeleteAllData(tableName){
    this.api.deleteAllData(tableName);
    this.api.http_delete_all_data_message.subscribe(result =>{
      this.alert_delete_message = result['message'];

      setTimeout(() => {
        this.alert_delete_message = null;
      }, 4000);
    })
  }
}


