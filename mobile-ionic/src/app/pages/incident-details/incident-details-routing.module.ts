import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncidentDetailsPage } from './incident-details.page';

const routes: Routes = [
  { path: '', component: IncidentDetailsPage },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class IncidentDetailsPageRoutingModule {}
