import { createAction, props } from '@ngrx/store';
import { ITodoItem } from '../model/todo-item.model';

/** Request to to load all the TODOs from the backend. */
export const loadTodosAction = createAction('[TODO] Load todos');
/** Popuplate the store with a list of TODOs. */
export const loadTodosDoneAction = createAction('[TODO] Load todos done', props<{todos: Array<ITodoItem>}>());
