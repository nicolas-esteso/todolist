import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { ITodoStore } from 'src/app/store/app.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatCheckboxModule } from '@angular/material';
import { Store } from '@ngrx/store';

describe('TodoItemComponent', () => {
  let mockStore: MockStore<ITodoStore>;
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  const initialState: ITodoStore = {
    store: {
      isLoaded: true,
      todos: [
        { id: 1, title: 'Title of the TODO done', done: true, creationDate: Date.parse('2010-01-01') },
        { id: 2, title: 'Title of the TODO', done: false, creationDate: Date.parse('2010-01-01') }
      ],
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoItemComponent,
      ],
      imports: [
        MaterialModule,
        RouterModule,
        MatCheckboxModule
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
    fixture.whenStable().then(_ => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.mat-list-item p').textContent).toBe('Title of the TODO done');
      expect(compiled.querySelector('.mat-list-item').style.textDecoration).toBe('line-through');
      expect(compiled.querySelector('.mat-checkbox input').checked).toBe(true);
    });
  }));

  it('should display a unchecked checkbox if the TODO is not done', fakeAsync(() => {
    component.todoId = 2;
    fixture.detectChanges();
    fixture.whenStable().then(_ => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.mat-list-item p').textContent).toBe('Title of the TODO');
      expect(compiled.querySelector('.mat-list-item').style.textDecoration).toBe('initial');
      expect(compiled.querySelector('.mat-checkbox input').checked).toBe(false);
    });

  }));
});
