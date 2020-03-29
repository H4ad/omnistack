import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IncidentItemModule } from '../../components/incident-item/incident-item.module';

import { IncidentDetailsPageRoutingModule } from './incident-details-routing.module';
import { IncidentDetailsPage } from './incident-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentDetailsPageRoutingModule,
    IncidentItemModule,
  ],
  declarations: [
    IncidentDetailsPage,
  ],
})
export class IncidentDetailsPageModule {}
