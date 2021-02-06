import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCalendarModule } from './dashboard-calendar/dashboard-calendar.module';
import { TopInstructorsModule } from './top-instructors/top-instructors.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardCalendarModule,
    TopInstructorsModule,
  ],
})
export class DashboardModule {}
