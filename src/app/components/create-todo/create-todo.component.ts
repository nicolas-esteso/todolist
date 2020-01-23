import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITodoCreationFormContent, ITodoStore } from '../../store/app.state';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import * as TodoSelectors from '../../store/todo.selectors';
import * as TodoActions from '../../store/todo.actions';
import { ITodoCreationData } from 'src/app/model/todo-item.model';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'td-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTodoComponent implements OnInit {

  formState$: Observable<FormGroupState<ITodoCreationFormContent>>;

  constructor(private store: Store<ITodoStore>, private router: Router) { }

  ngOnInit() {
    this.formState$ = this.store.select(TodoSelectors.selectCreationFormState);
  }

  createTodo() {
    this.store.select(TodoSelectors.selectTodoToCreate).pipe(
      take(1),
    ).subscribe((data: ITodoCreationData) => {
      // Create the todo and return to the todo list.
      this.store.dispatch(TodoActions.createTodoAction(data));
      this.navigateToList();
    });
  }

  /**
   * Return the the todo list but before that, reset the form status to clear errors (otherwise
   * the errors remain when leaving the component with the back button).
   */
  navigateToList() {
    this.store.dispatch(TodoActions.resetFormDataAction());
    this.router.navigateByUrl('');
  }
}
