import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/todo.effects';
import { todoReducer } from './store/todo.reducer';
import { HttpClientModule } from '@angular/common/http';
import { MockedTodoService } from './mocked-todo-service';
import { environment } from 'src/environments/environment';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { SortTodosPipe } from './sort-todos.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    SortTodosPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MockedTodoService),
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({store: todoReducer}),
    EffectsModule.forRoot([TodoEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25}) : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
