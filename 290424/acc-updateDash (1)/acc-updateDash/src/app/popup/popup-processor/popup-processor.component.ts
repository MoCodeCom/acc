import { Component, ElementRef,EventEmitter,Input,OnDestroy,OnInit,Output } from '@angular/core';
import { ShareService } from '../../services/processor/share.service';
import { CredoraxService } from '../../services/processor/credorax.service';


@Component({
  selector: 'app-popup-processor',
  templateUrl: './popup-processor.component.html',
  styleUrl: './popup-processor.component.css'
})
export class PopupProcessorComponent implements OnInit{
  data:any[] = [];
  showStatementData = null;
  statementDetails:{processor:string, date:string, curr:string};
  @Output() close = new EventEmitter<void>();
  @Input()showstatementlist;
  constructor(
    
    private elementRef: ElementRef,
    private shareService:ShareService,
    private serviceCredorex:CredoraxService,
  ){
    //this.data = [];
    
  }

  ngOnInit(): void {
    //this.data = [];
    //this.data = this.serviceCredorex.Subject_index_statement.value;
    this.statementDetails = this.showstatementlist;
    this.OnGetData();
  }

  async OnGetData(){
    this.data = [];
      await this.serviceCredorex.get_index(this.statementDetails.processor,this.statementDetails.date,this.statementDetails.curr).then(async result =>{
        await setTimeout(() => {
          this.data = this.serviceCredorex.Subject_index_statement.value;
          console.log( this.data['res']);
        }, 1100);
        
        
      });
    //this.data = await this.serviceCredorex.Subject_index_statement.value;
  }



  OnClose(){
    this.data = [];
    this.elementRef.nativeElement.remove();
    this.close.emit();
  }

 

 
}
