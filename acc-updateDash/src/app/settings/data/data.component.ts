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

  //---------------------------------------------\\
  constructor(private api:ApiService){}
  
  onGenerateTable(tableName){
    this.tblAlrtClass = true;
    this.table_name = tableName;
  }

  onGenetateTableAlert(){
    
      this.api.generateTable(this.table_name);
      this.tblAlrtClass = false;
      this.table_name = '';

  }

  

  cancelGenerateTableAlert(){
      this.tblAlrtClass = false;

  }


  onDeleteTable(tableName){
    this.api.deleteTable(tableName);
    console.log(tableName);
  }
}
