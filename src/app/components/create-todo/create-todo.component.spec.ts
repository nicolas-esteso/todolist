import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateTodoComponent } from './create-todo.component';
import { MaterialModule } from 'src/app/material/material.module';
import { NgrxFormsModule, createFormGroupState } from 'ngrx-forms';
import { ErrorStateMatcherDirective } from './error-state-matcher.directive';
import { FooterActionsComponent } from '../footer-actions/footer-actions.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ITodoStore, ITodoCreationFormContent } from 'src/app/store/app.state';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTES } from 'src/app/app.routes';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { SortTodosPipe } from 'src/app/sort-todos.pipe';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { Store, MemoizedSelector } from '@ngrx/store';
import * as TodoSelectors from '../../store/todo.selectors';
import { ITodoCreationData } from 'src/app/model/todo-item.model';

describe('CreateTodoComponent', () => {
  let mockStore: MockStore<ITodoStore>;
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let location: Location;
  const initialState: ITodoStore = {
    store: {
      todos: [],
      isLoaded: true,
      todoCreationForm: createFormGroupState<ITodoCreationFormContent>('create-todo-form-id', {
        title: '',
        description: ''
    })
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateTodoComponent,
        ErrorStateMatcherDirective,
        FooterActionsComponent,
        TodoListComponent,
        TodoDetailComponent,
        SortTodosPipe,
        TodoItemComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(ROUTES),
        MaterialModule,
        NgrxFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoComponent);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.get(Store);
    mockStore.setState(initialState);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a form', () => {
    const compiled = fixture.debugElement.nativeElement;
    const h2 = compiled.querySelector('mat-toolbar h2');
    expect(h2.textContent).toEqual('Create a new TODO');

    expect(compiled.querySelector('.create-todo-form form')).toBeDefined();

    const titleInput = compiled.querySelector('.create-todo-form form .title-input input');
    expect(titleInput.textContent).toBe('');
    expect(titleInput.required).toBeTruthy();

    const descriptionInput = compiled.querySelector('.create-todo-form form .description-input textarea');
    expect(descriptionInput.value).toBe('');
    expect(descriptionInput.required).toBeFalsy();
  });

  it('should return to the list', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    const backButton = compiled.querySelector('mat-card-actions #back-button');
    expect(backButton).toBeDefined();
    expect(backButton.disabled).toBeFalsy();

    backButton.click();
    tick();

    expect(location.path()).toBe('/todos');
  }));

  it('should return to the list programmatically', fakeAsync(() => {
    component.navigateToList();
    tick();

    expect(location.path()).toBe('/todos');
  }));

  it('should have a mandatory field', fakeAsync(() => {
    const formContent = TodoSelectors.selectCreationFormState(initialState);
    const mockedSelector = mockStore.overrideSelector(TodoSelectors.selectCreationFormState, {
      ...formContent,
      isDirty: true,
      isTouched: true,
      isValid: false,
    });

    mockedSelector.setResult({
      ...formContent,
      isDirty: true,
      isTouched: true,
      isValid: false,
    });
    mockStore.setState({
      store: {
        isLoaded: true,
        todos: [],
        todoCreationForm: null,
      }
    });
    mockStore.refreshState();
    fixture.detectChanges();
    tick();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('td-footer-actions #create-button').disabled).toBeTruthy();

    mockedSelector.setResult({
      ...formContent,
      isValid: true,
    });
    mockStore.setState({
      store: {
        isLoaded: true,
        todos: [],
        todoCreationForm: null,
      }
    });
    mockStore.refreshState();
    fixture.detectChanges();
    tick();

    expect(compiled.querySelector('td-footer-actions #create-button').disabled).toBeFalsy();
  }));

});
