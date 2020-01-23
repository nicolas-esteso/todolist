import { ITodoStore, IApplicationState, ITodoCreationFormContent } from './app.state';
import { todoReducer } from './todo.reducer';
import { ITodoItem } from '../model/todo-item.model';
import * as TodoActions from './todo.actions';
import { createFormGroupState } from 'ngrx-forms';

describe('TodoReducers', () => {

    it('should initialize all the todos', () => {
        const initialState: ITodoStore = {
            store: {
                todos: [],
                isLoaded: false,
                todoCreationForm: null
            }
        };

        const initialTodoList: ITodoItem[] = [
            { id: 1, title: 'TODO1', done: false, description: '', lastChange: Date.parse('2010-01-01') },
            { id: 2, title: 'TODO2', done: true, description: '', lastChange: Date.parse('2011-01-01') },
            { id: 3, title: 'TODO3', done: false, description: '', lastChange: Date.parse('2013-01-01') },
            { id: 4, title: 'TODO4', done: false, description: '', lastChange: Date.parse('2012-01-01') },
            { id: 5, title: 'TODO5', done: true, description: '', lastChange: Date.parse('2014-01-01') },
        ];

        const initializedState: IApplicationState =
            todoReducer(initialState.store, TodoActions.loadTodosDoneAction({todos: initialTodoList}));

        expect(initializedState.todos.length).toBe(5);
        expect(initializedState.isLoaded).toBe(true);
    });

    it('should change the status of a TODO', () => {
        const initialChangeDate = Date.parse('2010-01-01');
        const initialStore: ITodoStore = {
            store: {
                todos: [
                    { id: 1, title: 'TODO1', done: false, description: '', lastChange: Date.parse('2010-01-01') },
                    { id: 2, title: 'TODO2', done: true, description: '', lastChange: initialChangeDate },
                    { id: 5, title: 'TODO5', done: true, description: '', lastChange: Date.parse('2014-01-01') },
                ],
                isLoaded: true,
                todoCreationForm: null
            }
        };

        const updatedTodo: ITodoItem = { ...initialStore.store.todos[1], done: false };
        const updatedStore: IApplicationState =
            todoReducer(initialStore.store, TodoActions.changeTodoStatusDoneAction(updatedTodo));

        expect(updatedStore.todos.length).withContext('The size should not have changed.').toBe(3);
        expect(updatedStore.todos[1].done).withContext('The status should have changed').not.toBe(true);
        expect(updatedStore.todos[1].lastChange).withContext('The last update date should have changed').not.toBe(initialChangeDate);
    });

    it('should empty the form content', () => {
        const formGroupState = createFormGroupState<ITodoCreationFormContent>('create-todo-form-id', {
            title: 'TODO',
            description: 'DESC'
        });

        const initialState: ITodoStore = {
            store: {
                todos: [],
                isLoaded: true,
                todoCreationForm: formGroupState,
            }
        };

        expect(initialState.store.todoCreationForm.controls.title.value).toBe('TODO');
        expect(initialState.store.todoCreationForm.controls.description.value).toBe('DESC');

        const result = todoReducer(initialState.store, TodoActions.resetFormDataAction);
        expect(result.todoCreationForm.controls.title.value).toBe('');
        expect(result.todoCreationForm.controls.description.value).toBe('');
    });

    it('should add a new TODO', () => {
        const initialState: ITodoStore = {
            store: {
                todos: [],
                isLoaded: true,
                todoCreationForm: null,
            }
        };

        const newTodo: ITodoItem = { id: 1, title: 'TODO', lastChange: Date.now(), done: false };
        const result = todoReducer(initialState.store, TodoActions.todoCreationDoneAction(newTodo));
        expect(result.todos.length).toBe(1);
    });
});
