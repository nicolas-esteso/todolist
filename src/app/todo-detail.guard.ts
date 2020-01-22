import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ITodoStore } from './store/app.state';
import { Store } from '@ngrx/store';
import * as TodoSelectors from './store/todo.selectors';
import { take, map, mergeMap, filter, timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoDetailGuard implements CanActivate {

  constructor(private store: Store<ITodoStore>, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      const todoId = +next.paramMap.get('todoId');
      // Determine if the todo exists (wait until the todos are loaded before).
      return this.store.select(TodoSelectors.isTodosLoaded).pipe(
        filter(isLoading => isLoading),
        timeout(5000),
        mergeMap(_ => this.store.select(TodoSelectors.selectTodo, { id: todoId }).pipe(
          take(1),
          map(todo => {
            if (todo === undefined) {
              this.router.navigate(['/']);
              return false;
            }

            return true;
          }),
      ))).pipe(
        catchError(_ => {
          this.router.navigate(['/']);
          return of(false);
        }),
      );
  }
}
