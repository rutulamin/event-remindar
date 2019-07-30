import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import moment from 'moment-timezone';
import { CalendarDayViewBeforeRenderEvent, CalendarEvent, CalendarMonthViewBeforeRenderEvent,
        CalendarView, CalendarWeekViewBeforeRenderEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { colors } from '../calendar-utils/colors';
import { ViewPeriod } from 'calendar-utils';
import { Observable, Subject } from 'rxjs';
import { ResDataEvent2, EventService, EventModal } from 'src/app/shared/event.service';
import { Router } from '@angular/router';


// interface RecurringEvent {
//   title: string;
//   color: any;
//   rrule?: {
//     freq: any;
//     bymonth?: number;
//     bymonthday?: number;
//     byweekday?: any;
//   };
// }


// moment.tz.setDefault('Utc');

@Component({
  selector: 'app-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendar.component.html',
})

export class DemoComponent implements OnInit {
  resEvent: EventModal[];
  resReminder = [];
  resEvent1 = [];
  resReminder1 = [];
  fetchObs: Observable<ResDataEvent2>;

  view = CalendarView.Month;

  viewDate = moment().toDate();

  calendarEvents: CalendarEvent[] = [];

  viewPeriod: ViewPeriod;
  refresh: Subject<any> = new Subject();

  constructor(private cdr: ChangeDetectorRef, private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.fetchObs = this.eventService.fetchEvent();
    this.fetchObs.subscribe(
      (res) => {
        // console.log(res);
        this.resEvent = res.data.Event1;
        this.resReminder = res.data.Reminder1;
        this.resEvent1 = this.resEvent.map(
          data => (
            {
              id: data.id,
              start: new Date(data.startdate),
              end: new Date(data.enddate),
              title: data.title,
              color: colors.yellow
            }
            )
        );
        this.resReminder1 = this.resReminder.map(
          data => (
            {
              id: data.id,
              start: new Date(data.startdate),
              title: data.title,
              color: colors.blue
            }
            )
        );
        this.calendarEvents = [...this.resEvent1, ...this.resReminder1];
        // console.log(this.calendarEvents);
      }, (err) => {
        console.log(err);
        
      }
    );
    // this.calendarEvents = [...this.resEvent1, ...this.resReminder1];

  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
    this.eventService.eventId = event.id;
    
    this.router.navigate(['/events/' + event.id]);

  }

  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
     this.calendarEvents = [...this.resEvent1, ...this.resReminder1];
     
    }
  }
}
