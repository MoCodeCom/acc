import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayoutComponent } from './payout.component';
import { WwcCashExpressComponent } from './wwc-cash-express/wwc-cash-express.component';
import { GccComponent } from './gcc/gcc.component';
import { UptComponent } from './upt/upt.component';
import { SaudiComponent } from './saudi/saudi.component';
import { DavinateComponent } from './davinate/davinate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlertModule, NgbDatepickerModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PayoutComponent,
    WwcCashExpressComponent,
    GccComponent,
    UptComponent,
    SaudiComponent,
    DavinateComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    [NgbPaginationModule, NgbAlertModule,NgbNavModule],
    FormsModule,
    NgbDatepickerModule,
    RouterModule,
  ],
  exports:[
    PayoutComponent,
    WwcCashExpressComponent,
    GccComponent,
    UptComponent,
    SaudiComponent,
    DavinateComponent
  ]
})
export class PayoutModule { }
