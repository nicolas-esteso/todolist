import { ITodoStore } from './app.state';
import { ITodoItem } from '../model/todo-item.model';
import { loadTodosDoneAction, loadTodosAction } from './todo.actions';
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TodoEffects } from './todo.effects';
import { TodoService } from '../services/todo.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('TodoEffects', () => {
    let actions$: Observable<Action>;
    let effects: TodoEffects;
    let todoService: jasmine.SpyObj<TodoService>;

    const initialState: ITodoStore = {
        store: {
            todos: [],
            isLoaded: true
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            TodoEffects,
            provideMockStore({ initialState }),
            provideMockActions(() => actions$),
            {
                provide: TodoService,
                useValue: jasmine.createSpyObj('todoService', ['getTodos'])
            }
          ]
        }).compileComponents();

        effects = TestBed.get(TodoEffects);
        todoService = TestBed.get(TodoService);
      });

    it('should trigger the TODO initialization', () => {
        const getTodosMock: ITodoItem[] = [
            { id: 1, title: 'TODO1', done: false, creationDate: Date.parse('2010-01-01') },
            { id: 2, title: 'TODO2', done: true, creationDate: Date.parse('2011-01-01') },
            { id: 3, title: 'TODO3', done: false, creationDate: Date.parse('2013-01-01') },
        ];

        actions$ = of(loadTodosAction);
        todoService.getTodos.and.returnValue(of(getTodosMock));

        effects.initializeTodos$.subscribe(action => {
            expect(action.type).toBe(loadTodosDoneAction.type);
            expect(action.todos.length).toEqual(3);
        });
    });

    it('should return an empty observable if an error occurs', () => {
        actions$ = of(loadTodosAction);
        todoService.getTodos.and.returnValue(throwError('An error occurred'));

        effects.initializeTodos$.subscribe(
            action => {
                expect(action.type).toBe(loadTodosDoneAction.type);
                expect(action.todos.length).toEqual(0);
            },
            _ => fail('The initialization should not have failed')
        );
    });
});
