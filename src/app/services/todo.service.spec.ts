import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ITodoItem } from '../model/todo-item.model';
import { environment } from 'src/environments/environment';

describe('TodoService', () => {
  let todoService: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    todoService = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('should return a list of TODOs through a GET API', () => {
    const mockedResponse: ITodoItem[] = [
      { id: 1, title: 'TODO1', done: false, lastChange: new Date().getDate() },
      { id: 2, title: 'TODO2', done: true, lastChange: new Date().getDate() },
      { id: 3, title: 'TODO3', done: false, lastChange: new Date().getDate() },
      { id: 4, title: 'TODO4', done: false, lastChange: new Date().getDate() },
    ];

    todoService.getTodos().subscribe(
      todos => {
        expect(todos.length).withContext('There should be 4 TODOs in the response').toBe(4);
        expect(todos.filter(todo => todo.done).length).withContext('Only one TODO should be done').toBe(1);
      },
    );

    const request = httpMock.expectOne(`${environment.baseUrl}/api/todos/`);
    request.flush(mockedResponse);

    expect(request.request.method).toBe('GET');
  });

  it('should update a single todo', () => {
    const todoToUpdate: ITodoItem = { id: 1, title: 'TODO', lastChange: Date.now(), done: false };
    todoService.updateTodo(todoToUpdate).subscribe(_ => {});

    const request = httpMock.expectOne(`${environment.baseUrl}/api/todos/${todoToUpdate.id}`);
    request.flush({});
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toBe(todoToUpdate);
  });
});
