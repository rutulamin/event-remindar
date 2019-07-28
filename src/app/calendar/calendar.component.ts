import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent,
  CalendarDayViewBeforeRenderEvent, CalendarMonthViewBeforeRenderEvent,
  CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
  import RRule from 'rrule';
  import moment from 'moment-timezone';
// import { colors } from '../demo-utils/colors';
import { ViewPeriod } from 'calendar-utils';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

interface RecurringEvent {
  id?: string | number;
  end?: Date;
  title: string;
  color: any;
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: any;
    byweekday?: any;
  };
}

//moment.tz.setDefault('Utc');


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {

  refresh: Subject<any> = new Subject();
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view = CalendarView.Month;
  viewDate: Date = new Date();
  // viewDate = moment().toDate();
  calendarEvents: CalendarEvent[] = [];
  viewPeriod: ViewPeriod;

  CalendarView = CalendarView;

  recurringEvents: RecurringEvent[] = [
    {
      title: 'Recurs on the 5th of each month',
      color: colors.yellow,
      rrule: {
        freq: RRule.MONTHLY,
        bymonthday: [6]
      }
    },
    {
      title: 'Recurs yearly on the 10th of the current month',
      color: colors.blue,
      rrule: {
        freq: RRule.YEARLY,
        bymonth: moment().month() + 1,
        bymonthday: 10
      }
    },
    {
      title: 'Recurs weekly on mondays',
      color: colors.red,
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [RRule.MO]
      }
    }
  ];

  
  // view: CalendarView = CalendarView.Month;

  

  // viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private cdr: ChangeDetectorRef) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date)
      && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map(iEvent => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true
  //       }
  //     }
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter(event => event !== eventToDelete);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  updateCalendarEvents( viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.events = [];

      this.recurringEvents.forEach(event => {
        const rule: RRule = new RRule({
          ...event.rrule,
          dtstart: moment(viewRender.period.start)
            .startOf('day')
            .toDate(),
          until: moment(viewRender.period.end)
            .endOf('day')
            .toDate()
        });
        const { title, color } = event;

        rule.all().forEach(date => {
          this.events.push({
            title,
            color,
            start: moment(date).toDate(),
          });
        });
      });
      this.cdr.detectChanges();
    }
  }

}
