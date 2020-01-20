import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ITodoItem } from '../../model/todo-item.model';
import { Store } from '@ngrx/store';
import { ITodoStore } from '../../store/app.state';
import * as TodoSelectors from '../../store/todo.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  @Input() todoId: number;
  todo$: Observable<ITodoItem>;

  constructor(private store: Store<ITodoStore>) { }

  ngOnInit() {
    this.todo$ = this.store.select(TodoSelectors.selectTodo, { id: this.todoId });
  }

}
