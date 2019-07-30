import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import RRule from 'rrule';

export interface EventModal {
  id: string;
  title: string;
  start: Date;
  startdate: string;
  enddate?: string;
  category: string;
  repeat: string;
  description?: string;
  type: string;
  offset?: number;
  location?: string;
  user_id?: string;
  endtime?: string;
  rrule?: RRule;
}

export interface ResDataEvent1 {
  data: {
    todayEvent: EventModal[];
    upcomingEvent: EventModal[];
    todayReminder: EventModal[];
    oldReminder: EventModal[];
    upcomingReminder: EventModal[];
    oldEvent: EventModal[];
  };
}

export interface ResDataEvent2 {
  data: {
    Event1: EventModal[],
    Reminder1: EventModal[]
  };
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  paramObs = new Subject<string>();

  eventId: any = '';
  constructor(private http: HttpClient) { }
  msg = new Subject<{message: string, status: boolean}>();

  onAdd(events: EventModal) {
    return this.http.post<{ msg: string }>(environment.APIURL + 'event', events);
  }
  getEvent() {
    return this.http.get<ResDataEvent1>(environment.APIURL + 'event');
  }
  fetchEvent() {
    return this.http.get<ResDataEvent2>(environment.APIURL + 'event/calendar-event');
  }
  getEventById(id: string) {
    return this.http.get<{data: EventModal}>(environment.APIURL + 'event/' + id);
  }
}
