import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { IncidentItemComponent } from './incident-item.component';

@NgModule({
  exports: [
    IncidentItemComponent,
  ],
  declarations: [
    IncidentItemComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class IncidentItemModule {}
