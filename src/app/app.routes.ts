import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'todos'},
    { path: 'todos', component: TodoListComponent },
];
