import { Component, OnInit, inject, Input, input, Output, output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ProcessorsService } from '../processors.service';
import { HttpClient } from '@angular/common/http';
import { throwError} from 'rxjs';
import { CredoraxService } from '../../services/processor/credorax.service';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-checkout-new',
  templateUrl: './checkout-new.component.html',
  styleUrl: './checkout-new.component.css'
})
export class CheckoutNewComponent {
    
	
	calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);
	/*----------------- statement list ------------------*/
    register_statement_list = 'Registered Statement';
	statement_list:any = null;
	showstatement:boolean = false;
	
	showstatementlist_parent:object= {processor:'',date:'', curr:''};
	/*---------------------------------------------------*/
	currency='GBP';
	currencies = ['USD', 'GBP', 'CAD','SAR', 'EUR']
	// Date picker
	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);



	//upload file
	status:"initial" |"uploading"| "success" | "fail" = "initial";
	file:File | null = null;
	/*-------------------- Alert variables ---------------------*/
	uploadSystemMessage:any='';
	uploadCredorxMessage:any='';
	reconciliationMessage:any;

	/*----------------------- reconciliation-----------------------------*/


	public countProcessorData = this.processorsService.countProcessorBehaveior;
    public countSystemData = this.processorsService.countSystemBehaveior;
	public dataProcessor:any;
	// Table

	/*------------------------- register -----------------------------------*/
	sum_payment:any[] = [];
	sum_fee:any[]=[] //'[fixed,discount,interchange,card,acquiring]'
	sum_fee_total:any[]=[];
	sum_refund:any[]=[];
	sum_recon:any[]=[];
	
	refresh:boolean = false;
	
	/*----------------------------------------------------------------------*/


	constructor(
		private processorsService:ProcessorsService,
		private http:HttpClient,
		private serviceCredorax:CredoraxService,
		private apiService:ApiService,
		
  ){}
	ngOnInit(): void {
    this.count();
	this.onGetPayments();
	this.onGetSumPayment();
	this.onGetSumFees();
	this.onRefresh();
	this.onGetRefund();
	this.onGetSumRecon();
  }

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

	onChangeCurrency(curr){
		if(curr === 'GBP'){
			this.currency = curr;
		}else if(curr === 'EUR'){
			this.currency = 'EUR';
		}else if(curr === 'US'){
			this.currency = 'US';
		}else{
			this.currency = 'Currency';
		}
	}

	//------------- input upload file -------------------//

	onChangeCredorex(data:any){
		const File:File = data.target.files[0];
		if(File){
			this.status = "initial";
			this.file = File;
		}
	}

	onUploadCredorex(){
		if(this.file){
			const formData = new FormData();
			formData.append('file', this.file, this.file.name);
			const upload$ = this.http.post("http://localhost:9000/processor/credorax/uploadcredorex", formData);
			this.status = 'uploading';
			upload$.subscribe({
				next:(result)=>{
					this.status = 'success';
					this.uploadCredorxMessage = result;
					console.log(result);
				},
				error:(error:any)=>{
					this.status = 'fail';
					return throwError(()=> error)
				}
			})
		}


		this.uploadCredorxMessage = '';
		this.uploadSystemMessage = '';
	}

	onUploadCpCredorex(){
		if(this.file){
			const formData = new FormData();
			formData.append('file', this.file, this.file.name);
			const upload$ = this.http.post("http://localhost:9000/processor/credorax/uploadcpcredorex", formData);
			this.status = 'uploading';
			upload$.subscribe({
				next:(result)=>{
					this.status = 'success';
					this.uploadSystemMessage = result;
				},
				error:(error:any)=>{
					this.status = 'fail';
					return throwError(()=> error)
				}
			})
		}

		this.uploadCredorxMessage = '';
		this.uploadSystemMessage = '';
	}

	onChangeCpCredorex(data:any){
		const File:File = data.target.files[0];
		if(File){
			this.status = "initial";
			this.file = File;
		}
	}

	async onReconCredorex(){
		await this.getMatchAuto();
		await setTimeout(async()=>{
			this.http.get('http://localhost:9000/processor/credorax/reconcredorex').subscribe(result =>{
			this.reconciliationMessage = result;
		})

		await setTimeout(() => {
			this.reconciliationMessage = null;
            window.location.reload();
		}, 2000);
		}, 10);
	}

	async getMatchAuto(){
		await this.http.delete('http://localhost:9000/processor/credorax/deleterowreconcredorexauto').subscribe(result =>{
			console.log(result);
		})
	}

  async count(){
	await setTimeout(() => {
	  this.countProcessorData = this.processorsService.countProcessorBehaveior;
      this.countSystemData = this.processorsService.countSystemBehaveior;
	}, 500);
      
  }


  refresh_data(){
    //this.serviceCredorax.delete_row_auto();
	//this.reconciliationMessage = 'Is done!';//this.serviceCredorax.Subjec_message;
  }

  /********************************************************/
  

  async onClearReconCredorex(){
	await this.apiService.deleteAllData('recon_credorex');
	window.location.reload();
  }

  async onGetPayments(){
	await this.serviceCredorax.get_Payments('credorax')
	.then(() =>{
		setTimeout(() => {
			this.statement_list = this.serviceCredorax.Subject_statement_list.value;
		}, 1000);
	}).catch(error =>{console.log(error);});
  }

  async onGetSumPayment(){
		await this.serviceCredorax.get_sum_payment('credorax',this.currencies)
		.then((result)=>{
			//const dataArr;
			setTimeout(() => {
				this.sum_payment = [];
				const data = this.serviceCredorax.Subject_sum_payment.value
				for(let i =0;i<data.length;i++){
					if(data[i]['res'][0]['total_sum'] !== null){
						this.sum_payment.push({res:data[i]['res'][0]['total_sum'], curr:data[i]['curr']});
					}
				}
			}, 1000);
		})
		.catch(error =>{
			console.log(error);
		});
  }

  async onGetSumFees(){
	const feesType = ['fixed_transaction_fee','discount_rate','interchange','card_scheme_fees','acquiring_fee'];
	this.sum_fee = [];
	this.sum_fee_total = [];
	this.serviceCredorax.get_sum_fee('credorex',this.currencies,feesType)
	.then((result)=>{
		let isCurrencyExistthis:any = null;
		//console.log(result);
		setTimeout(() => {
			isCurrencyExistthis = this.serviceCredorax.Subject_sum_fee.value;
			this.sum_fee = this.serviceCredorax.Subject_sum_fee.value;
			
		}, 1000);
	})
	.catch(error => console.log(error));

	this.sum_fee_total = this.onGetFeesTotal(this.sum_fee);
	//console.log(this.sum_fee);

  }

  onGetFeesTotal(arr:any[]){
	const totalFees:any[] = [];
	
	arr.forEach(element =>{
		const currency = element['curr'];
		const amount = typeof element['res']['total_sum'] === 'string'? parseFloat(element['res']['total_sum']):element['res']['total_sum'] ;

		if(!totalFees.some(item => item.currency === element['curr'])){
			totalFees.push({currency, amount});
		}else{
			const fee = totalFees.filter(item => item.currency === currency);
			fee[0]['amount'] += amount;
		}

	});
	return totalFees;
  }

  async onGetRefund(){
	this.sum_refund = [];
	await this.serviceCredorax.get_sum_refund('credorex',this.currencies)
	.then(async result =>{
		await setTimeout(() => {
			if(this.serviceCredorax.Subject_refund.value === null || this.serviceCredorax.Subject_refund.value === undefined){
				this.sum_refund = null;
			}else{
				this.sum_refund = this.serviceCredorax.Subject_refund.value;
			}
			
		}, 500);
	})
	.catch(error => {
		console.log(error);
	})

  }

  onRefresh(){
	this.refresh = this.serviceCredorax.Subject_refresh.value;
	if(this.refresh === true){
		window.location.reload();
	}
	this.refresh = false;
	
  }

  async onGetSumRecon(){
	this.sum_recon = [];
	for(let i = 0;i<this.currencies.length;i++){
		
		await this.serviceCredorax.get_sum_recon('recon_credorex',this.currencies[i])
		.then(result =>{
			setTimeout(() => {
				const isExist = this.serviceCredorax.Subject_sum_recon.value;
			    if(isExist['res'][0]['total_sum'] !== null && isExist['curr'] === this.currencies[i]){
				this.sum_recon.push(isExist)
			}
			}, 500);
			
		})
		.catch(error =>{
			console.log(error);
		})
	}
  }

  async onShowStatement(date, curr){
	this.showstatementlist_parent = {processor:'credorex',date:date, curr:curr};
	this.showstatement = true;
	
  }

  onCloseShow(){
	this.showstatement = false;
  }
}
