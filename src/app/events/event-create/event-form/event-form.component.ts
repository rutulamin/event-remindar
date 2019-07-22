import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

    fromdate: string;
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
    constructor() { }

    ngOnInit() {
    }
    onAdd(f: NgForm) {
        console.log(f);
    }
}
