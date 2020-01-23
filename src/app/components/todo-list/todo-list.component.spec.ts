import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { SortTodosPipe } from 'src/app/sort-todos.pipe';
import { ITodoStore } from 'src/app/store/app.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterActionsComponent } from '../footer-actions/footer-actions.component';
import { Location } from '@angular/common';
import { ROUTES } from 'src/app/app.routes';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { ErrorStateMatcherDirective } from '../create-todo/error-state-matcher.directive';

describe('TodoListComponent', () => {
  let mockStore: MockStore<ITodoStore>;
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let location: Location;
  const initialState: ITodoStore = {
    store: {
      isLoaded: true,
      todos: [
        { id: 1, title: 'Title of the TODO', done: false, lastChange: Date.parse('2010-01-01') },
        { id: 2, title: 'Title of the TODO2', done: true, lastChange: Date.parse('2010-01-01') }
      ],
      todoCreationForm: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        SortTodosPipe,
        TodoItemComponent,
        FooterActionsComponent,
        TodoDetailComponent,
        CreateTodoComponent,
        ErrorStateMatcherDirective
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(ROUTES),
        NgrxFormsModule,
      ],
      providers: [ provideMockStore({ initialState })]
    })
    .compileComponents();

    mockStore = TestBed.get(Store);
    mockStore.setState(initialState);
  });

  beforeEach(() => {
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of todos', fakeAsync(() => {
    fixture.whenStable().then(_ => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.main-todo-list')).not.toBeNull();
      expect(compiled.querySelectorAll('td-todo-item').length).toBe(2);
      expect(compiled.querySelectorAll('.main-todo-list .divider-container').length).toBe(1);
    });
  }));

  it('should enable creation of a new todo', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    const compiled = fixture.debugElement.nativeElement;
    const createTodoButton = compiled.querySelector('mat-card-actions button');
    expect(createTodoButton).toBeDefined();
    createTodoButton.click();
    tick();
    expect(location.path()).toBe('/create');
  }));
});
