import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { EventsComponent } from './events/events.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { EventCreateComponent } from './events/event-create/event-create.component';
import { EventFormComponent } from './events/event-create/event-form/event-form.component';
import { ReminderFormComponent } from './events/event-create/reminder-form/reminder-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HeaderComponent,
    EventsComponent,
    AuthComponent,
    EventCreateComponent,
    EventFormComponent,
    ReminderFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
