import { CanActivateFn } from '@angular/router';
import { AfService } from "../providers/af.service";
import { inject } from '@angular/core';
import { tap, map, take } from 'rxjs/operators';

export const subscriberGuard: CanActivateFn = (route, state) => {
  return inject(AfService).user$.pipe(
    take(1),
    map(user => user && user.roles.subscriber ? true : false),
    tap(isAdmin => {
      if(!isAdmin) {
        console.error("Access denied - Subscribers only allowed");
      }
    })
  )
};
