import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITodoStore } from './store/app.state';
import { loadTodosAction } from './store/todo.actions';
import { Observable } from 'rxjs';
import * as TodoSelectors from './store/todo.selectors';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Overkill TODO List';

  isLoaded$: Observable<boolean>;

  constructor(private store: Store<ITodoStore>) { }

  ngOnInit() {
    this.store.dispatch(loadTodosAction());
    this.isLoaded$ = this.store.select(TodoSelectors.isTodosLoaded);
  }
}
