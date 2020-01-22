import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ITodoStore } from 'src/app/store/app.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ROUTES } from 'src/app/app.routes';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { FooterActionsComponent } from '../footer-actions/footer-actions.component';
import { SortTodosPipe } from 'src/app/sort-todos.pipe';

describe('TodoItemComponent', () => {
  let mockStore: MockStore<ITodoStore>;
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let location: Location;
  const initialState: ITodoStore = {
    store: {
      isLoaded: true,
      todos: [
        { id: 1, title: 'Title of the TODO done', done: true, lastChange: Date.parse('2010-01-01') },
        { id: 2, title: 'Title of the TODO', done: false, lastChange: Date.parse('2010-01-01') }
      ],
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoItemComponent,
        TodoDetailComponent,
        TodoListComponent,
        FooterActionsComponent,
        SortTodosPipe
      ],
      imports: [
        MaterialModule,
        RouterTestingModule.withRoutes(ROUTES)
      ],
      providers: [ provideMockStore({ initialState }) ]
    })
    .compileComponents();

    mockStore = TestBed.get(Store);
    mockStore.setState(initialState);
  });

  beforeEach(() => {
    mockStore.setState(initialState);
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
  });

  it('should display the title of the TODO', fakeAsync(() => {
    component.todoId = 1;
    fixture.detectChanges();
    fixture.whenStable().then(_ => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('p').textContent).toBe('Title of the TODO done');
    });

  }));

  it('should display a checked checkbox if the TODO is done', fakeAsync(() => {
    component.todoId = 1;
    fixture.detectChanges();
    tick();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-list-item p').textContent).toBe('Title of the TODO done');
    expect(compiled.querySelector('.mat-list-item').style.textDecoration).toBe('line-through');
    expect(compiled.querySelector('.mat-checkbox input').checked).toBe(true);
  }));

  it('should display a unchecked checkbox if the TODO is not done', fakeAsync(() => {
    component.todoId = 2;
    fixture.detectChanges();
    tick();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mat-list-item p').textContent).toBe('Title of the TODO');
    expect(compiled.querySelector('.mat-list-item').style.textDecoration).toBe('initial');
    expect(compiled.querySelector('.mat-checkbox input').checked).toBe(false);
  }));

  it('should display a button to view a TODO\'s detail', fakeAsync(() => {
    component.todoId = 2;
    fixture.detectChanges();
    tick();

    const compiled = fixture.debugElement.nativeElement;
    const editButton = compiled.querySelector('.actions-container button.edit-button');
    expect(editButton).not.toBeNull();
    editButton.click();
    tick();
    expect(location.path()).toBe('/todo/2');
  }));

});
