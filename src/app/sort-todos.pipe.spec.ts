import { SortTodosPipe } from './sort-todos.pipe';
import { ITodoItem } from './model/todo-item.model';

describe('SortTodoPipe', () => {
  let pipe: SortTodosPipe;

  beforeEach(() => {
    pipe = new SortTodosPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort a list of TODOSs', () => {
    const todoList: ITodoItem[] = [
      { id: 1, title: 'TODO1', done: false, lastChange: Date.parse('2010-01-01') },
      { id: 2, title: 'TODO2', done: true, lastChange: Date.parse('2011-01-01') },
      { id: 3, title: 'TODO3', done: false, lastChange: Date.parse('2013-01-01') },
      { id: 4, title: 'TODO4', done: false, lastChange: Date.parse('2012-01-01') },
      { id: 5, title: 'TODO5', done: true, lastChange: Date.parse('2014-01-01') },
    ];

    const result = pipe.transform(todoList);
    expect(result.length).withContext('The size of the list should remain the same').toBe(todoList.length);

    expect(result[0].id).withContext('The todos should be sorted').toBe(3);
    expect(result[1].id).withContext('The todos should be sorted').toBe(4);
    expect(result[2].id).withContext('The todos should be sorted').toBe(1);
    expect(result[3].id).withContext('The todos should be sorted').toBe(2);
    expect(result[4].id).withContext('The todos should be sorted').toBe(5);
  });

  it('should only manage arrays', () => {
    const todo = undefined;
    const result = pipe.transform(todo);
    expect(result).toBe(undefined);
  });
});
