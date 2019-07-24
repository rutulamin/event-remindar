import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventModal } from 'src/app/shared/event.service';
import moment from 'moment-timezone';
import RRule from 'rrule';


@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.css']
  })

export class EventFormComponent implements OnInit {
    events: EventModal;
    fdate: string;
    category: { name: string}[] = [
        { name: 'General Metting' },
        { name: 'Project Meeting' },
        { name: 'Birthday' },
        { name: 'Anniversary' }
    ];
    frequency: { name: string }[] = [
        { name: 'Does not repeat'},
        { name: 'Daily' },
        { name: 'Weekly' },
        { name: 'Monthly'},
        { name: 'Yearly' }
    ];
    constructor() { }

    ngOnInit() {
    }
    onAdd(f: NgForm) {
        const d1 = new Date(f.value.fromdate).toISOString();
        const d2 = new Date(f.value.todate).toISOString();
        const date1 = moment(d1.toString()).format('YYYY-MM-DD HH:mm:ss');
        const date2 = moment(d2.toString()).format('YYYY-MM-DD HH:mm:ss');
        const offset = +moment(moment(d2.toString()).format('YYYYMMDD')).diff(moment(moment(d1.toString()).format('YYYYMMDD')), 'days');

        this.events = f.value;
        this.events.fromdate = date1;
        this.events.todate = date2;
        this.events.offset = offset;
        console.log(this.events);
        
        // const monthday = +date1.format('DD');
        // const month = +date1.format('MM');
        // let weekday = date1.weekday();
        // weekday = this.setWeekday(weekday);
        // console.log(offset);
        // console.log(monthday);
        // console.log(month);
        // console.log(weekday);
        
        // let monthday = [];
        // let dateday = [];
        // // var date1 = date1;
        // // var date2 = date2;
        // const dateStart = moment(date1, 'YYYY-MM-DD HH:mm:ss');
        // const dateEnd = moment(date2, 'YYYY-MM-DD HH:mm:ss');

        // while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
        //     monthday.push(dateStart.format('MM'));
        //     dateStart.add(1, 'month');
        // }
        
        // const dateStart1 = moment(date1, 'YYYY-MM-DD HH:mm:ss');
        // const dateEnd1 = moment(date2, 'YYYY-MM-DD HH:mm:ss');

        // while (dateEnd1 > dateStart1 || dateStart1.format('D') === dateEnd1.format('D')) {
        //     dateday.push(dateStart1.format('DD'));
        //     dateStart1.add(1, 'days');
        // }

        // function removeDups(names) {
        //     const unique = {};
        //     names.forEach( (i) => {
        //       if ( !unique[i] ) {
        //         unique[i] = true;
        //       }
        //     });
        //     return Object.keys(unique);
        //   }
        // monthday = removeDups(monthday);
        // dateday = removeDups(dateday);
        // let monthday1 = [];
        // let dateday1 = [];
        // monthday1 = monthday.map(Number);
        // dateday1 = dateday.map(Number);
         

        // console.log(monthday1);
        // console.log(dateday1);
    
        // // const moment = MomentRange.extendMoment(Moment);
        
        // // const start = moment()
        // // const end = moment().add(2, 'months')
        // // const range = moment.range(start, end)
        // // const arrayOfDates = Array.from(range.by('days'))
        // // console.log(arrayOfDates)
        

        // // console.log(f.value);
        // // this.events = f.value;
        // // this.events.id = '22saf';
        // // this.events.fromdate = moment(d1.toString()).format('YYYY-MM-DD h:mm:ss a');
        // // this.events.todate = moment(d2.toString()).format('YYYY-MM-DD h:mm:ss a');

        // // console.log(this.events);
    }
    setWeekday(day: number) {
        switch (day) {

            case 1:
                return RRule.MO;
                break;

            case 2:
                return RRule.TU;
                break;

            case 3:
                return RRule.WE;
                break;

            case 4:
                return RRule.TH;
                break;

            case 5:
                return RRule.FR;
                break;

            case 6:
                return RRule.SA;
                break;

            case 7:
                return RRule.SU;
                break;

            default:
                break;
        }
    }
    setfrequency(repeat: string, monthday: number, month: number, weekday: number) {

        switch (repeat) {

            case 'Does not repeat':
                return {
                    freq: '',
                    bymonthday: '',
                    bymonth: '',
                    byweekday: ''
                };
                break;

            case 'Daily':
                return {
                    freq: RRule.DAILY,
                    bymonthday: '',
                    bymonth: '',
                    byweekday: ''
                };
                break;

            case 'Weekly':
                return {
                    freq: RRule.WEEKLY,
                    bymonthday: '',
                    bymonth: '',
                    byweekday: ''
                };
                break;

            case 'Monthly':
                return {
                    freq: RRule.MONTHLY,
                    bymonthday: '',
                    bymonth: '',
                    byweekday: ''
                };
                break;

            case 'Yearly':
                return {
                    freq: RRule.YEARLY,
                    bymonthday: '',
                    bymonth: '',
                    byweekday: ''
                };

            default:
                break;
        }

    }
}
