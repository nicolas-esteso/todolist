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
    //  - In the done section, the most recently updated todo will be at the top of the list.
    //  - In the undone section, the most recently created todo will be at the bottom of the list.
    //
    todos.sort((a: ITodoItem, b: ITodoItem) => {
      if (a.done) {
        if (!b.done) {
          return 1;
        } else {
          return a.lastChange - b.lastChange;
        }
      } else if (b.done) {
        // a is unchecked.
        return -1;
      } else {
        // a and b are unchecked.
        return b.lastChange - a.lastChange;
      }
    });

    return todos;
  }
}
