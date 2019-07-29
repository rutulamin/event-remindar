import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { EventModal } from 'src/app/shared/event.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {
  EventData: EventModal;
  eventObs11: Observable<{data: EventModal}>;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.eventObs11 = this.eventService.getEventById(params.id);
        //console.log(this.eventObs11);
        
        console.log(params);
        
      }
    );

    this.eventObs11.subscribe(
      (res) => {
        this.EventData = res.data;
        // console.log('res', res.data.title);
        
        // this.EventData.id = res.data.id;
        // this.EventData.title = res.data.title;
        console.log(res.data);
        
      }, (err) => {
        console.log(err);
      }
    );
  }

}
