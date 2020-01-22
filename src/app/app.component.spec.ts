import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ROUTES } from './app.routes';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SortTodosPipe } from './sort-todos.pipe';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ITodoStore } from './store/app.state';
import { Store } from '@ngrx/store';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { FooterActionsComponent } from './components/footer-actions/footer-actions.component';

describe('AppComponent', () => {
  let mockStore: MockStore<ITodoStore>;
  const initialState: ITodoStore = {
    store: {
      todos: [],
      // In the initial state, isLoaded is set to true because most test cases will usually expect
      // the todos to be displayed.
      isLoaded: true
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodoListComponent,
        SortTodosPipe,
        TodoItemComponent,
        TodoDetailComponent,
        FooterActionsComponent
      ],
      imports: [
        MaterialModule,
        RouterModule.forRoot(ROUTES),
      ],
      providers: [
        provideMockStore({initialState})
      ]
    }).compileComponents();

    mockStore = TestBed.get(Store);
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Overkill TODO List'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Overkill TODO List');
  }));

  it('should display a toolbar with a title', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#todo-list-container .main-toolbar h1').textContent).toContain('Overkill TODO List');
  }));

  it('should display a spinner until the todos are loaded', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    // Change the isLoaded flag to false and expect the spinner.
    mockStore.setState({
      ...initialState,
      store: {
        ...initialState.store,
        isLoaded: false
      }
    });
    mockStore.refreshState();
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#todo-list-container .spinner')).not.toBeNull();

    // Change the isLoaded flag back to true, the spinner should disapear.
    mockStore.setState({
      ...initialState,
      store: {
        ...initialState.store,
        isLoaded: true
      }
    });
    mockStore.refreshState();
    fixture.detectChanges();

    expect(compiled.querySelector('#todo-list-container .spinner')).toBeNull();
  }));

});
