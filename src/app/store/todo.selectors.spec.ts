import { ITodoStore, ITodoCreationFormContent } from './app.state';
import * as TodoSelectors from './todo.selectors';
import { ITodoItem } from '../model/todo-item.model';
import { createFormGroupState } from 'ngrx-forms';

describe('TodoSelectors', () => {
    const mockedTodoList: ITodoItem[] = [
        { id: 1, title: 'TODO1', done: false, lastChange: Date.parse('2010-01-01') },
        { id: 2, title: 'TODO2', done: true, lastChange: Date.parse('2011-01-01') },
        { id: 3, title: 'TODO3', done: false, lastChange: Date.parse('2013-01-01') },
        { id: 4, title: 'TODO4', done: false, lastChange: Date.parse('2012-01-01') },
        { id: 5, title: 'TODO5', done: true, lastChange: Date.parse('2014-01-01') },
    ];

    let initialState: ITodoStore;
    beforeEach(() => {
        initialState = {
            store: {
                todos: [],
                isLoaded: false,
                todoCreationForm: createFormGroupState<ITodoCreationFormContent>('create-todo-form-id', {
                    title: '',
                    description: ''
                })
            }
        };
    });

    it('should select the loading state', () => {
        expect(TodoSelectors.isTodosLoaded(initialState)).toBe(false);

        initialState.store.isLoaded = true;
        expect(TodoSelectors.isTodosLoaded(initialState)).toBe(true);
    });

    it('should select all the TODOs', () => {
        expect(TodoSelectors.selectAllTodos(initialState).length).toBe(0);

        initialState.store.todos = mockedTodoList;
        expect(TodoSelectors.selectAllTodos(initialState).length).toBe(5);
    });

    it('should select a particular TODO', () => {
        expect(TodoSelectors.selectTodo(initialState, { id: 3 })).withContext('Select a todo while store is empty').toBe(undefined);

        initialState.store.todos = mockedTodoList;

        expect(TodoSelectors.selectTodo(initialState, { id: 3 }).title).withContext('Select an existing TODO').toBe('TODO3');
        expect(TodoSelectors.selectTodo(initialState, { id: 7 })).withContext('Select a non exising TODO').toBe(undefined);
    });

    it('should select the content of the form', () => {
        expect(TodoSelectors.selectCreationFormState(initialState).controls.title).toBeDefined();
        expect(TodoSelectors.selectCreationFormState(initialState).controls.title.value).toBe('');

        expect(TodoSelectors.selectCreationFormState(initialState).controls.description).toBeDefined();
        expect(TodoSelectors.selectCreationFormState(initialState).controls.description.value).toBe('');

        const newFormContent = createFormGroupState<ITodoCreationFormContent>('create-todo-form-id', {
            title: '',
            description: ''
        });

        const newState = {
            store: {
                ...initialState.store,
                todoCreationForm: {
                    ...newFormContent,
                    isDirty: true,
                    controls: {
                        ...newFormContent.controls,
                        title: {
                            ...newFormContent.controls.title,
                            isDirty: true,
                            value: 'Todo Title',
                        }
                    }
                }
            }
        };

        expect(TodoSelectors.selectCreationFormState(newState).controls.title.value).toBe('Todo Title');
        expect(TodoSelectors.selectCreationFormState(newState).controls.title.isDirty).toBeTruthy();

        expect(TodoSelectors.selectCreationFormState(newState).controls.description).toBeDefined();
        expect(TodoSelectors.selectCreationFormState(newState).controls.description.value).toBe('');

        expect(TodoSelectors.selectCreationFormState(newState).isDirty).toBeTruthy();
    });

    it('should select data about the TODO to create', () => {

        const formGroupState = createFormGroupState<ITodoCreationFormContent>('create-todo-form-id', {
            title: '',
            description: ''
        });

        const newState: ITodoStore = {
            store: {
                todos: [],
                isLoaded: true,
                todoCreationForm: {
                    ...formGroupState,
                    controls: {
                        ...formGroupState.controls,
                        title: {
                            ...formGroupState.controls.title,
                            value: 'TODO TITLE'
                        },
                        description: {
                            ...formGroupState.controls.description,
                            value: 'TODO DESC'
                        }
                    }
                }
            }
        };

        expect(TodoSelectors.selectTodoToCreate(newState).title).toBe('TODO TITLE');
        expect(TodoSelectors.selectTodoToCreate(newState).description).toBe('TODO DESC');
    });
});
