import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarDateFormatter, CalendarModule, CalendarMomentDateFormatter,
  DateAdapter, MOMENT } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import moment from 'moment-timezone';
// import { DemoUtilsModule } from '../demo-utils/module';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventListComponent } from './event-list/event-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

// export function momentAdapterFactory() {
//   return adapterFactory(moment);
// }

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
    EventListComponent,
    ProfileComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(
    {
      provide: DateAdapter,
      useFactory: adapterFactory
    },
    {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CalendarMomentDateFormatter
      }
    },
    // DemoUtilsModule
    )
  ],
  providers: [
    {
      provide: MOMENT,
      useValue: moment
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
