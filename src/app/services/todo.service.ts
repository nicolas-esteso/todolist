import { Injectable } from '@angular/core';
import { ITodoItem } from '../model/todo-item.model';
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
}
