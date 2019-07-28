import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

export interface EventModal {
  id?: string;
  title: string;
  startdate: string;
  enddate?: string;
  category: string;
  repeat: string;
  description?: string;
  type: string;
  offset?: number;
  location?: string;
  user_id?: string;
  rrule?: {
      freq?: any,
      bymonthday?: any,
      byweekday?: any,
  };
}

export interface ResDataModel {
  id: string;
  title: string;
  location?: string;
  category: string;
  startdate: string;
  enddate?: string;
  repeat: string;
  type: string;
}
export interface resDataEvent {
  data: {
    todayEvent: ResDataModel[];
    upcomingEvent: ResDataModel[];
    todayReminder: ResDataModel[];
    oldReminder: ResDataModel[];
    upcomingReminder: ResDataModel[];
    oldEvent: ResDataModel[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private http: HttpClient) { }
  msg = new Subject<{message: string, status: boolean}>();

  onAdd(events: EventModal) {
    return this.http.post<{ msg: string }>(environment.APIURL + 'event', events);
  }
  getEvent() {
    return this.http.get<resDataEvent>(environment.APIURL + 'event');
  }
}
