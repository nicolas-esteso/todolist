import { browser, $$, ElementArrayFinder, $ } from 'protractor';
import { TodoDetailPage } from './todo-detail.po';

export class TodoListPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getAllTodos(): ElementArrayFinder {
    return $$('td-todo-item');
  }

  getTodoLabel(todoPosition: number) {
    return this.getAllTodos().get(todoPosition).$('p').getText();
  }

  getTodoStatus(todoPosition: number) {
    return this.getAllTodos().get(todoPosition).$('input').getAttribute('checked');
  }

  getTitle() {
    return $('td-root h1').getText();
  }

  doTodo(todoPositiion: number) {
    const todoItem = this.getAllTodos().get(todoPositiion);
    const checkbox = todoItem.$('mat-checkbox');
    checkbox.click();
  }

  enterTodoDetail(todoPosition: number): TodoDetailPage {
    this.getAllTodos().get(todoPosition).$('.actions-container .edit-button').click();
    return new TodoDetailPage();
  }
}
