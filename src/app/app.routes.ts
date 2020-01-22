import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoDetailGuard } from './todo-detail.guard';

export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'todos'},
    { path: 'todos', component: TodoListComponent },
    { path: 'todo/:todoId', component: TodoDetailComponent, canActivate: [ TodoDetailGuard ] },
];
