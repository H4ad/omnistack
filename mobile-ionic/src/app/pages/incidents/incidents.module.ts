import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { IncidentItemModule } from '../../components/incident-item/incident-item.module';

import { IncidentsPageRoutingModule } from './incidents-routing.module';
import { IncidentsPage } from './incidents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentsPageRoutingModule,
    VirtualScrollerModule,
    IncidentItemModule,
  ],
  declarations: [
    IncidentsPage,
  ],
})
export class IncidentsPageModule {}
