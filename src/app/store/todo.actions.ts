import { createAction, props } from '@ngrx/store';
import { ITodoItem, ITodoCreationData } from '../model/todo-item.model';

/** Request to to load all the TODOs from the backend. */
export const loadTodosAction = createAction('[TODO] Load todos');
/** Popuplate the store with a list of TODOs. */
export const loadTodosDoneAction = createAction('[TODO] Load todos done', props<{todos: Array<ITodoItem>}>());
/** Update the status of a todo item. */
export const changeTodoStatusAction = createAction('[TODO] Change todo status', props<ITodoItem>());
/** The status of a TODO has successfully been updated. */
export const changeTodoStatusDoneAction = createAction('[TODO] Change todo status done', props<ITodoItem>());

/** Action triggered to launch the TODO creation. */
export const createTodoAction = createAction('[TODO] Create a new todo', props<ITodoCreationData>());
/** Action used to update the store when the new TODO has been created. */
export const todoCreationDoneAction = createAction('[TODO] A new todo has been created', props<ITodoItem>());
/** Resets the form data. */
export const resetFormDataAction = createAction('[TODO] Reset form data');
