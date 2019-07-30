import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { AuthComponent } from './auth/auth.component';
import { EventCreateComponent } from './events/event-create/event-create.component';
import { EventFormComponent } from './events/event-create/event-form/event-form.component';
import { ReminderFormComponent } from './events/event-create/reminder-form/reminder-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { AuthGaurdService } from './auth/auth-gaurd.service';
import { ProfileComponent } from './profile/profile.component';
import { EventdetailComponent } from './events/eventdetail/eventdetail.component';
import { EventResolverService } from './shared/event-resolver.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/events/new/event', pathMatch: 'full' },
    { path: 'events', component: EventsComponent, canActivate: [AuthGaurdService],
    children: [
        { path: 'new', component: EventCreateComponent,
        children: [
            { path: 'event', component: EventFormComponent },
            { path: 'remindar', component: ReminderFormComponent}
        ]
        },
        {
            path: ':id', component: EventdetailComponent, resolve: [EventResolverService]
        }
    ]
    },
    {
        path: 'event-list', component: EventListComponent, canActivate: [AuthGaurdService]
    },
    {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGaurdService]
    },
    { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
