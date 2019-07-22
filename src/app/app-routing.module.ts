import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { AuthComponent } from './auth/auth.component';
import { EventCreateComponent } from './events/event-create/event-create.component';
import { EventFormComponent } from './events/event-create/event-form/event-form.component';
import { ReminderFormComponent } from './events/event-create/reminder-form/reminder-form.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/events/new', pathMatch: 'full' },
    { path: 'events', component: EventsComponent,
    children: [
        { path: 'new', component: EventCreateComponent,
        children: [
            { path: 'event', component: EventFormComponent },
            { path: 'remindar', component: ReminderFormComponent}
        ]
        },
    ]
    },
    { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
