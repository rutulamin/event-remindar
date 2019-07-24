import { Injectable } from '@angular/core';

export interface EventModal {
  id?: string;
  title: string;
  fromdate: string;
  todate?: string;
  category: string;
  repeat: string;
  description?: string;
  type: string;
  offset?: number;
  user_id?: string;
  rrule?: {
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
