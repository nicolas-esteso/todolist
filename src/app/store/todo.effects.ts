import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import * as TodoActions from './todo.actions';
import { of } from 'rxjs';
import { ITodoItem } from '../model/todo-item.model';

@Injectable()
export class TodoEffects {

    constructor(private actions$: Actions, private todoService: TodoService) { }

    initializeTodos$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.loadTodosAction),
        mergeMap(() => this.todoService.getTodos().pipe(
            map((response: Array<ITodoItem>) => TodoActions.loadTodosDoneAction({ todos: response })),
            catchError(_ => {
                // If an error occurs, return an empty list
                return of(TodoActions.loadTodosDoneAction({ todos: [] }));
            })
        ))
    ));

    changeTodoStatus$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.changeTodoStatusAction),
        mergeMap(todo => this.todoService.updateTodo(todo).pipe(
            map(_ => TodoActions.changeTodoStatusDoneAction(todo))
        ))
    ));
}
