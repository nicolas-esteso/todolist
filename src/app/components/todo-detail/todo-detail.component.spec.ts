import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailComponent } from './todo-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { IApplicationState } from 'src/app/store/app.state';
import { provideMockStore } from '@ngrx/store/testing';
import { FooterActionsComponent } from '../footer-actions/footer-actions.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ROUTES } from 'src/app/app.routes';
import { Location } from '@angular/common';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { SortTodosPipe } from 'src/app/sort-todos.pipe';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { ErrorStateMatcherDirective } from '../create-todo/error-state-matcher.directive';

describe('TodoDetailComponent', () => {

  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let router: Router;
  let location: Location;

  const initialState: { store: IApplicationState } = {
    store: {
      isLoaded: false,
      todos: [
        { id: 1, title: 'TODO1', done: false, lastChange: Date.now(), description: 'DESC1'},
        { id: 2, title: 'TODO2', done: true, lastChange: Date.now(), description: 'DESC2'},
      ],
      todoCreationForm: null
    }
  };

  describe('TodoDetailComponent undone', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TodoDetailComponent,
          FooterActionsComponent,
          TodoListComponent,
          SortTodosPipe,
          TodoItemComponent,
          CreateTodoComponent,
          ErrorStateMatcherDirective
        ],
        imports: [
          MaterialModule,
          RouterTestingModule.withRoutes(ROUTES),
          NgrxFormsModule
        ],
        providers: [
          provideMockStore({ initialState }),
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({todoId: '1'})
              }
            }
          }
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      router = TestBed.get(Router);
      fixture = TestBed.createComponent(TodoDetailComponent);
      component = fixture.componentInstance;
      location = TestBed.get(Location);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display a done TODO', async(() => {
      const compiled = fixture.debugElement.nativeElement;
      const h2 = compiled.querySelector('mat-toolbar h2');
      expect(h2.textContent).toEqual('TODO1');

      const h2Style = getComputedStyle(h2);
      expect(h2Style.textDecoration).not.toContain('line-through');

      expect(compiled.querySelector('mat-checkbox input').checked).toBeFalsy();
      expect(compiled.querySelector('.todo-description').textContent).toEqual('DESC1');
      expect(compiled.querySelector('td-footer-actions button')).toBeDefined();

      compiled.querySelector('td-footer-actions button').click();
      expect(location.path()).toBe('');
    }));
  });

  describe('TodoDetailComponent done', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TodoDetailComponent,
          FooterActionsComponent,
          TodoListComponent,
          SortTodosPipe,
          TodoItemComponent,
          CreateTodoComponent,
          ErrorStateMatcherDirective
        ],
        imports: [
          MaterialModule,
          RouterTestingModule.withRoutes(ROUTES),
          NgrxFormsModule
        ],
        providers: [
          provideMockStore({ initialState }),
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({todoId: '2'})
              }
            }
          }
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      router = TestBed.get(Router);
      fixture = TestBed.createComponent(TodoDetailComponent);
      component = fixture.componentInstance;
      location = TestBed.get(Location);
      fixture.detectChanges();
    });

    it('should display a done TODO', async(() => {
      const compiled = fixture.debugElement.nativeElement;
      const h2 = compiled.querySelector('mat-toolbar h2');
      expect(h2.textContent).toEqual('TODO2');

      const h2Style = getComputedStyle(h2);
      expect(h2Style.textDecoration).toContain('line-through');

      expect(compiled.querySelector('mat-checkbox input').checked).toBeTruthy();
      expect(compiled.querySelector('.todo-description').textContent).toEqual('DESC2');
      expect(compiled.querySelector('td-footer-actions button')).toBeDefined();

      compiled.querySelector('td-footer-actions button').click();
      expect(location.path()).toBe('');
    }));
  });
});
