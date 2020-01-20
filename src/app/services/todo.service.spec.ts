import { TestBed, async } from '@angular/core/testing';
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

  beforeEach(async(() => {
    todoService = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('should return a list of TODOs through a GET API', () => {
    const mockedResponse: ITodoItem[] = [
      { id: 1, title: 'TODO1', done: false, creationDate: new Date().getDate() },
      { id: 2, title: 'TODO2', done: true, creationDate: new Date().getDate() },
      { id: 3, title: 'TODO3', done: false, creationDate: new Date().getDate() },
      { id: 4, title: 'TODO4', done: false, creationDate: new Date().getDate() },
    ];

    todoService.getTodos().subscribe(
      todos => {
        expect(todos.length).withContext('There should be 4 TODOs in the response').toBe(4);
        expect(todos.filter(todo => todo.done).length).withContext('Only one TODO should be done').toBe(1);
      },
    );

    const request = httpMock.expectOne(`${environment.baseUrl}/api/todos/`);
    request.flush(mockedResponse);
  });
});
