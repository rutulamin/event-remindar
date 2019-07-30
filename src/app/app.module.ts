import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
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
import { MatTabsModule } from '@angular/material';
import { DemoModule } from './calender-view/calendar/calendar.module';
import { DemoUtilsModule } from './calender-view/calendar-utils/calendar-utils.module';
import { EventdetailComponent } from './events/eventdetail/eventdetail.component';
import { EventResolverService } from './shared/event-resolver.service';

// export function momentAdapterFactory() {
//   return adapterFactory(moment);
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventsComponent,
    AuthComponent,
    EventCreateComponent,
    EventFormComponent,
    ReminderFormComponent,
    EventListComponent,
    ProfileComponent,
    EventdetailComponent,
  ],
  imports: [
    DemoModule,
    DemoUtilsModule,
    MaterialModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    EventResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
