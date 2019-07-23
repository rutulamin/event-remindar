import { Injectable } from '@angular/core';

export interface EventModal {
  id: string;
  title: string;
  fromdate: any;
  todate: string;
  category: string;
  repeat: string;
  description?: string;
  rrule: {
      freq?: any,
      bymonthday?: any,
      byweekday?: any,
  };
}

@Injectable({
  providedIn: 'root'
})

export class EventService {


  constructor() { }

  events: EventModal[];


}
