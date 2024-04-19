import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProcessorsComponent } from './processors.component';
import { CredoraxComponent } from './credorax/credorax.component';
import { AibmsComponent } from './aibms/aibms.component';
import { PaysafeOldComponent } from './paysafe-old/paysafe-old.component';
import { PaysafeNewComponent } from './paysafe-new/paysafe-new.component';
import { CheckoutNewComponent } from './checkout-new/checkout-new.component';
import { CheckoutOldComponent } from './checkout-old/checkout-old.component';
import { TruelayerComponent } from './truelayer/truelayer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbAlertModule, NgbDatepickerModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';





@NgModule({
  declarations: [
    ProcessorsComponent,
    CredoraxComponent,
    AibmsComponent,
    PaysafeOldComponent,
    PaysafeNewComponent,
    CheckoutNewComponent,
    CheckoutOldComponent,
    TruelayerComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    [NgbPaginationModule, NgbAlertModule,NgbNavModule,NgbDropdownModule,DecimalPipe, FormsModule, NgbTypeaheadModule, NgbPaginationModule],
    FormsModule,
    NgbDatepickerModule,
    RouterModule,
    [MatTreeModule, MatButtonModule, MatIconModule]
  ],
  exports:[
    ProcessorsComponent,
    CredoraxComponent,
    AibmsComponent,
    PaysafeNewComponent,
    PaysafeOldComponent,
    CheckoutNewComponent,
    CheckoutOldComponent,
    TruelayerComponent
  ]
})
export class ProcessorsModule { }
