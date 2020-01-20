import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { RouterModule } from '@angular/router';
import { SortTodosPipe } from 'src/app/sort-todos.pipe';
import { ITodoStore } from 'src/app/store/app.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';

describe('TodoListComponent', () => {
  let mockStore: MockStore<ITodoStore>;
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  const initialState: ITodoStore = {
    store: {
      isLoaded: true,
      todos: [
        { id: 1, title: 'Title of the TODO', done: false, creationDate: Date.parse('2010-01-01') },
        { id: 2, title: 'Title of the TODO2', done: true, creationDate: Date.parse('2011-01-01') }
      ],
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        SortTodosPipe,
        TodoItemComponent,
      ],
      imports: [
        RouterModule,
        MaterialModule
      ],
      providers: [ provideMockStore({ initialState })]
    })
    .compileComponents();

    mockStore = TestBed.get(Store);
    mockStore.setState(initialState);
  });

  beforeEach(() => {
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
});
