import { ITodoStore } from './app.state';
import * as TodoSelectors from './todo.selectors';
import { ITodoItem } from '../model/todo-item.model';

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
                isLoaded: false
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
});
