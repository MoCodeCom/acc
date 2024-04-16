import { Component, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerService } from '../datepicker.service';

@Component({
  selector: 'app-aibms',
  templateUrl: './aibms.component.html',
  styleUrl: './aibms.component.css'
})
export class AibmsComponent {

	constructor(private datepicker:DatepickerService){}
	calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);
	currency = 'Currency';

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

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


}
