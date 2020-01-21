import { createReducer, on, Action } from '@ngrx/store';
import { ITodoItem } from '../model/todo-item.model';
import { IApplicationState } from './app.state';
import * as TodoActions from './todo.actions';

export const initialState: IApplicationState = {
    isLoaded: false,
    todos: [],
};

export function todoReducer(currentState: IApplicationState, action: Action) {
    return createReducer<IApplicationState>(
        initialState,
        on(TodoActions.loadTodosDoneAction, (state: IApplicationState, param: {todos: Array<ITodoItem>}) => initTodos(state, param.todos)),
        on(TodoActions.changeTodoStatusDoneAction, (state: IApplicationState, todo: ITodoItem) => changeStatus(state, todo)),
    )(currentState, action);
}

export function initTodos(state: IApplicationState, todos: Array<ITodoItem>): IApplicationState {
    return {
        ...state,
        isLoaded: true,
        todos
    };
}

export function changeStatus(state: IApplicationState, updatedTodo: ITodoItem): IApplicationState {
    return {
        ...state,
        todos: [
            ...state.todos.map(todo => {
                if (todo.id === updatedTodo.id) {
                    return {
                        ...todo,
                        // This would be better on server side...
                        lastChange: Date.now(),
                        done: updatedTodo.done
                    };
                } else {
                    return todo;
                }
            }),
        ]
    };
}
