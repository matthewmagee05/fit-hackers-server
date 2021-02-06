import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DashboardCalendarService } from './dashboard-calendar.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

interface WorkoutClass {
  createdAt: string;
  description: string;
  id: string;
  instructor: Instructor;
  platform: Platform;
  time: string;
  updatedAt: string;
  workoutType: WorkoutType;
}

interface Instructor {
  id: string;
  name: string;
}

interface Platform {
  id: string;
  name: string;
  color: string;
}

interface WorkoutType {
  id: string;
  name: string;
}

@Component({
  selector: 'app-dashboard-calendar',
  templateUrl: './dashboard-calendar.component.html',
  styleUrls: ['./dashboard-calendar.component.css'],
})
export class DashboardCalendarComponent implements OnInit {
  events$: Observable<CalendarEvent[]>;
  viewDate = moment();
  dayStartHour = this.viewDate.hours();
  dayEndHour = this.viewDate.hours() + 3;
  classTypes = new Set();
  constructor(private calendarService: DashboardCalendarService) {}

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts() {
    this.events$ = this.calendarService.getClasses().pipe(
      map((results: WorkoutClass[]) => {
        return results.map((workoutClass: WorkoutClass) => {
          this.classTypes.add(workoutClass.platform);
          return {
            title: `${workoutClass.platform.name} - ${moment(
              moment(workoutClass.time).utc().format('YYYY-MM-DD HH:mm:ss')
            )
              .toDate()
              .toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
              })} - ${workoutClass.workoutType.name} - ${
              workoutClass.instructor.name
            }`,
            start: moment(
              moment(workoutClass.time).utc().format('YYYY-MM-DD HH:mm:ss')
            ).toDate(),
            color: {
              primary: workoutClass.platform.color,
              secondary: workoutClass.platform.color,
            },
            allDay: false,
            meta: {
              workoutClass,
            },
            cssClass: 'event-class',
          };
        });
      })
    );
  }
}
