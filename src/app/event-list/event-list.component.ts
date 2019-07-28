import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EventService, resDataEvent, EventModal } from '../shared/event.service';
import { Observable } from 'rxjs';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, AfterViewInit {

  eventObs: Observable<resDataEvent>;

  @ViewChild(MatPaginator, {static: false}) paginator1: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) paginator2: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) paginator3: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) paginator4: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) paginator5: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) paginator6: MatPaginator;

  public displayedColumns = ['title', 'startdate', 'enddate', 'category', 'repeat', 'location'];
  public displayedColumns1 = ['title', 'startdate', 'category', 'repeat'];
  public dataSource1 = new MatTableDataSource<EventModal>();
  public dataSource2 = new MatTableDataSource<EventModal>();
  public dataSource3 = new MatTableDataSource<EventModal>();
  public dataSource4 = new MatTableDataSource<EventModal>();
  public dataSource5 = new MatTableDataSource<EventModal>();
  public dataSource6 = new MatTableDataSource<EventModal>();

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventObs = this.eventService.getEvent();

    this.eventObs.subscribe(
      (res) => {
        this.dataSource1.data = res.data.todayEvent as EventModal[];
        this.dataSource2.data = res.data.upcomingEvent as EventModal[];
        this.dataSource3.data = res.data.oldEvent as EventModal[];
        this.dataSource4.data = res.data.todayReminder as EventModal[];
        this.dataSource5.data = res.data.upcomingReminder as EventModal[];
        this.dataSource6.data = res.data.oldReminder as EventModal[];

        this.dataSource1.paginator = this.paginator1;
        this.dataSource2.paginator = this.paginator2;
        this.dataSource3.paginator = this.paginator3;
        this.dataSource4.paginator = this.paginator4;
        this.dataSource5.paginator = this.paginator5;
        this.dataSource6.paginator = this.paginator6;
        console.log(res);
      
      }, (err) => {
        console.log(err, err);
      }
    );
  }

  ngAfterViewInit() {
    
  }

}
