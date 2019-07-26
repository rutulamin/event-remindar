import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  msg: string;
  err: string;
  status = false;
  constructor( private eventService: EventService) { }

  ngOnInit() {
    this.msg = null;
    this.err = null;
    this.eventService.msg.subscribe(
      (res) => {
        if (res.status) {
          this.err = null;
          this.msg = res.message;
        } else {
          this.msg = null;
          this.err = res.message;
        }
        setTimeout(() => {
          this.msg = null;
        }, 3000);
      }
    );
  }

}
