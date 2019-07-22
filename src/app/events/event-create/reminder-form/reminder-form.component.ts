import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.css']
})
export class ReminderFormComponent implements OnInit {

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

}
