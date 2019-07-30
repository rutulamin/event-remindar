import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EventModal, EventService } from './event.service';
import { Observable } from 'rxjs';

export class EventResolverService implements Resolve<{data: EventModal}> {

    constructor(private eventService: EventService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{data: EventModal}> {

        return this.eventService.getEventById(route.params.id);
    }
}
