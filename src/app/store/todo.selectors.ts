import { createSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { ITodoStore } from './app.state';
import { ITodoItem } from '../model/todo-item.model';

export const selectAllTodos = (state: ITodoStore) => state.store.todos;
export const selectTodo: MemoizedSelectorWithProps<ITodoStore, { id: number }, ITodoItem> = createSelector(
    selectAllTodos,
    (todos: Array<ITodoItem>, props) => {
        return todos.find(todo => todo.id === props.id);
    }
);

export const isTodosLoaded = (state: ITodoStore) => state.store.isLoaded;
