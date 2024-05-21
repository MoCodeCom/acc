import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CodeComponent } from './code/code.component';
import { StatementsComponent } from './statements/statements/statements.component';
import { AccountsComponent } from './accounts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlertModule, NgbDatepickerModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AccountsComponent,
    CodeComponent,
    StatementsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    [NgbPaginationModule, NgbAlertModule,NgbNavModule,NgbDropdownModule,DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule,],
    FormsModule,
    NgbDatepickerModule,
    RouterModule,
    [MatTreeModule, MatButtonModule, MatIconModule],
    NgxPaginationModule,
  ],
  exports:[
    AccountsComponent,
    CodeComponent,
    StatementsComponent
  ]
})
export class AccountsModule { }
