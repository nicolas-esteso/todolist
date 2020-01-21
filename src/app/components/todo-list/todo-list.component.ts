import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITodoItem } from '../../model/todo-item.model';
import { ITodoStore } from '../../store/app.state';
import * as TodoSelectors from '../../store/todo.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('blockAnimation', [
      transition(':enter', [])
    ]),
    trigger('todo', [
      transition(':enter', [
        animate(400, keyframes([
          style({ backgroundColor: 'rgba(250, 250, 250)', transform: 'translateX(-100px)' }),
          style({ transform: 'translateX(0)' }),
        ]))
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Array<ITodoItem>>;

  constructor(private store: Store<ITodoStore>) { }

  ngOnInit() {
    this.todos$ = this.store.select(TodoSelectors.selectAllTodos);
  }

}
