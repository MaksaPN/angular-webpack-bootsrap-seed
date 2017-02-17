import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    DashboardRoutingModule
  ],
  exports: [],
  declarations: [DashboardComponent],
  providers: [
    UserService
  ],
})
export class DashboardModule { }
