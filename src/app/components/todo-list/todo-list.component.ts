import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITodoItem } from '../../model/todo-item.model';
import { ITodoStore } from '../../store/app.state';
import * as TodoSelectors from '../../store/todo.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Array<ITodoItem>>;

  constructor(private store: Store<ITodoStore>) { }

  ngOnInit() {
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
  }

}
