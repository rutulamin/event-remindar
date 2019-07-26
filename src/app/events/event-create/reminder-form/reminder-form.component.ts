import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import moment from 'moment-timezone';
import { EventModal, EventService } from 'src/app/shared/event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.css']
})
export class ReminderFormComponent implements OnInit {
    eventObs: Observable<{msg: string}>;
    events: EventModal = null;

    category: { name: string}[] = [
        { name: 'General Metting' },
        { name: 'Project Meeting' }
    ];
    frequency: { name: string }[] = [
        { name: 'Does not repeat'},
        { name: 'Daily' },
        { name: 'Weekly' },
        { name: 'Monthly'}
    ];
    constructor(private eventService: EventService) { }

    ngOnInit() {
    }

    onAdd(f: NgForm) {
        const d1 = new Date(f.value.startdate).toISOString();
        const date1 = moment(d1.toString()).format('YYYY-MM-DD HH:mm:ss');

        this.events = f.value;
        this.events.startdate = date1;
        this.events.type = 'reminder';
        this.eventObs = this.eventService.onAdd(this.events);

        this.eventObs.subscribe(
            (res) => {
              this.eventService.msg.next({message: res.msg, status: true});
            }, (err) => {
              this.eventService.msg.next({message: err.error, status: false});
            }
          );
    }
}
