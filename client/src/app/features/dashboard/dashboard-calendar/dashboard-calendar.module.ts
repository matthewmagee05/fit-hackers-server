import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCalendarComponent } from './dashboard-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};



@NgModule({
  declarations: [DashboardCalendarComponent],
  imports: [
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
  ],
  exports: [
    DashboardCalendarComponent
  ]
})
export class DashboardCalendarModule { }
