import { ITodoStore, IApplicationState } from './app.state';
import { todoReducer } from './todo.reducer';
import { ITodoItem } from '../model/todo-item.model';
import { loadTodosDoneAction } from './todo.actions';

describe('TodoReducers', () => {
    let initialState: ITodoStore;

    beforeEach(() => {
        initialState = {
            store: {
                todos: [],
                isLoaded: false
            }
        };
    });

    it('should initialize all the todos', () => {
        const initialTodoList: ITodoItem[] = [
            { id: 1, title: 'TODO1', done: false, creationDate: Date.parse('2010-01-01') },
            { id: 2, title: 'TODO2', done: true, creationDate: Date.parse('2011-01-01') },
            { id: 3, title: 'TODO3', done: false, creationDate: Date.parse('2013-01-01') },
            { id: 4, title: 'TODO4', done: false, creationDate: Date.parse('2012-01-01') },
            { id: 5, title: 'TODO5', done: true, creationDate: Date.parse('2014-01-01') },
        ];

        const initializedState: IApplicationState = todoReducer(initialState.store, loadTodosDoneAction({todos: initialTodoList}));
        expect(initializedState.todos.length).toBe(5);
        expect(initializedState.isLoaded).toBe(true);
    });
});
