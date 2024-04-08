import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessorsComponent } from './processors.component';
import { CredoraxComponent } from './credorax/credorax.component';
import { AibmsComponent } from './aibms/aibms.component';
import { PaysafeOldComponent } from './paysafe-old/paysafe-old.component';
import { PaysafeNewComponent } from './paysafe-new/paysafe-new.component';
import { CheckoutNewComponent } from './checkout-new/checkout-new.component';
import { CheckoutOldComponent } from './checkout-old/checkout-old.component';
import { TruelayerComponent } from './truelayer/truelayer.component';




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
    CommonModule
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
