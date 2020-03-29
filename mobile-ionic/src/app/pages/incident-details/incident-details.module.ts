import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentDetailsPageRoutingModule } from './incident-details-routing.module';
import { IncidentDetailsPage } from './incident-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentDetailsPageRoutingModule,
  ],
  declarations: [
    IncidentDetailsPage,
  ],
})
export class IncidentDetailsPageModule {}
