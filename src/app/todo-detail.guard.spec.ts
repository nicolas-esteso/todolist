import { TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

import { TodoDetailGuard } from './todo-detail.guard';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ITodoStore } from './store/app.state';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';

describe('TodoDetailGuard', () => {
  let router: Router;
  let mockStore: MockStore<ITodoStore>;
  let guard: TodoDetailGuard;
  let route: ActivatedRoute;
  const initialState: ITodoStore = {
    store: {
      isLoaded: true,
      todos: [{ id: 1, title: 'TODO', lastChange: Date.now(), done: true}],
      todoCreationForm: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        TodoDetailGuard,
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({todoId: '1'})
            }
          }
        }
      ],
    });
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    guard = TestBed.get(TodoDetailGuard);
    route = TestBed.get(ActivatedRoute);
    mockStore = TestBed.get(Store);
  });

  it('should return false if the todo id doesn\'t exist', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    mockStore.setState({
      store: {
        ...initialState.store,
        todos: [],
      }
    });

    const result: Observable<boolean> = guard.canActivate(route.snapshot, null);
    result.subscribe(x => {
      expect(x).toBe(false);
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
    tick(5000);
  }));

  it('should return false the todos are not loaded.', fakeAsync(() => {
    mockStore.setState({
      store: {
        ...initialState.store,
        isLoaded: false
      }
    });

    const result: Observable<boolean> = guard.canActivate(route.snapshot, null);
    result.subscribe(x => {
      expect(x).toBe(false);
    });
    tick(5000);
  }));

  it('should return true if the todos are loaded and the id exists', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    mockStore.setState(initialState);

    const result: Observable<boolean> = guard.canActivate(route.snapshot, null);
    result.subscribe(x => {
      expect(x).toBe(true);
      expect(navigateSpy).not.toHaveBeenCalledWith(['/']);
    });

    tick(1000);
    discardPeriodicTasks();

  }));
});
