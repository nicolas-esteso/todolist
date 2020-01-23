import { Injectable } from '@angular/core';
import { ITodoItem, ITodoCreationData } from '../model/todo-item.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Array<ITodoItem>> {
    return this.http.get<Array<ITodoItem>>(`${environment.baseUrl}/api/todos/`);
  }

  updateTodo(todoItem: ITodoItem): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/todos/${todoItem.id}`, todoItem);
  }

  createTodo(todoCreationData: ITodoCreationData): Observable<ITodoItem> {
    return this.http.post<ITodoItem>(`${environment.baseUrl}/api/todos/`, todoCreationData);
  }
}
