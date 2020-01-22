import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITodoItem } from '../../model/todo-item.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ITodoStore } from '../../store/app.state';
import { ActivatedRoute } from '@angular/router';
import * as TodoSelectors from '../../store/todo.selectors';

@Component({
  selector: 'td-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent implements OnInit {

  todoItem$: Observable<ITodoItem>;

  constructor(private route: ActivatedRoute, private store: Store<ITodoStore>) { }

  ngOnInit() {
    const todoId = +this.route.snapshot.paramMap.get('todoId');
    this.todoItem$ = this.store.select(TodoSelectors.selectTodo, { id: todoId } );
  }

}
