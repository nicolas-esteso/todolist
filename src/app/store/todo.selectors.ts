import { createSelector, MemoizedSelectorWithProps, MemoizedSelector } from '@ngrx/store';
import { ITodoStore, ITodoCreationFormContent, IApplicationState } from './app.state';
import { ITodoItem, ITodoCreationData } from '../model/todo-item.model';
import { FormGroupState } from 'ngrx-forms';

export const selectStore = (state: ITodoStore) => state.store;

export const selectAllTodos = (state: ITodoStore) => state.store.todos;
export const selectTodo: MemoizedSelectorWithProps<ITodoStore, { id: number }, ITodoItem> = createSelector(
    selectAllTodos,
    (todos: Array<ITodoItem>, props) => {
        return todos.find(todo => todo.id === props.id);
    }
);

export const isTodosLoaded = (state: ITodoStore) => state.store.isLoaded;


export const selectCreationFormState = createSelector(
    selectStore,
    (store: IApplicationState) => store.todoCreationForm
);
export const selectTodoToCreate: MemoizedSelector<ITodoStore, ITodoCreationData> = createSelector(
    selectCreationFormState,
    (formState: FormGroupState<ITodoCreationFormContent>) => {
        return {
            title: formState.controls.title.value,
            description: formState.controls.description.value
        };
    }
);
