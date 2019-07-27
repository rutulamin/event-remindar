import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService, ResData } from '../shared/event.service';
import { Observable } from 'rxjs';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  eventObs: Observable<{resData: ResData[]}>;

  public displayedColumns = ['title', 'dateOfBirth', 'address', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource< ResData>();

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventObs = this.eventService.getEvent();
    this.eventObs.subscribe(
      (res) => {
        this.dataSource.data = res.resData as ResData[];
        this.dataSource.paginator = this.paginator;
        console.log(res);
        
      }, (err) => {
        console.log(err, err.error.err);
        
      }
    );
  }

}
