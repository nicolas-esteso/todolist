import { createReducer, on, Action } from '@ngrx/store';
import { ITodoItem } from '../model/todo-item.model';
import { IApplicationState, ITodoCreationFormContent } from './app.state';
import * as TodoActions from './todo.actions';
import { createFormGroupState, updateGroup, validate, wrapReducerWithFormStateUpdate, onNgrxForms } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

export const initialFormContent = createFormGroupState<ITodoCreationFormContent>('create-todo-form-id', {
    title: '',
    description: ''
});

export const initialState: IApplicationState = {
    isLoaded: false,
    todos: [],
    todoCreationForm: initialFormContent
};

export function todoReducer(currentState: IApplicationState, action: Action) {
    return createReducer<IApplicationState>(
        initialState,
        on(TodoActions.loadTodosDoneAction, (state: IApplicationState, param: {todos: Array<ITodoItem>}) => initTodos(state, param.todos)),
        on(TodoActions.changeTodoStatusDoneAction, (state: IApplicationState, todo: ITodoItem) => changeStatus(state, todo)),
        on(TodoActions.todoCreationDoneAction, (state: IApplicationState, todo: ITodoItem) => todoCreated(state, todo)),
        on(TodoActions.resetFormDataAction, (state: IApplicationState) => resetFormData(state)),
        onNgrxForms()
    )(currentState, action);
}

const validationFormGroupReducer = updateGroup<ITodoCreationFormContent>({
    title: validate(required)
});

export function reducers(currentState: IApplicationState, action: Action) {
    return wrapReducerWithFormStateUpdate(
        todoReducer,
        (state: IApplicationState) => state.todoCreationForm,
        validationFormGroupReducer,
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

export function todoCreated(state: IApplicationState, todo: ITodoItem) {
    return {
        ...state,
        todoCreationForm: initialFormContent,
        todos: [
            ...state.todos,
            todo
        ]
    };
}

export function resetFormData(state: IApplicationState) {
    return {
        ...state,
        todoCreationForm: initialFormContent
    };
}
