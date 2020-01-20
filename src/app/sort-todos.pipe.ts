import { Pipe, PipeTransform } from '@angular/core';
import { ITodoItem } from './model/todo-item.model';

@Pipe({
  name: 'sortTodos'
})
export class SortTodosPipe implements PipeTransform {

  transform(todos: Array<ITodoItem>): Array<ITodoItem> {
    if (!Array.isArray(todos)) {
      return;
    }

    //
    // Sort the todos.
    // This is how the todos are sorted:
    //  - They are split into two categories: the ones that are done and the ones that aren't.
    //  - The ones that are done are always at the top of the list.
    //  - In each of the two sections, todos are sorted by creation date. The newest TODO will be at the top
    //    of its section.
    //
    todos.sort((a: ITodoItem, b: ITodoItem) => {
      if (a.done) {
        if (!b.done) {
          return 1;
        } else {
          return b.creationDate - a.creationDate;
        }
      } else if (b.done) {
        // a is unchecked.
        return -1;
      } else {
        // a and b are unchecked.
        return b.creationDate - a.creationDate;
      }
    });

    return todos;
  }
}
