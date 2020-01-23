import { browser, $ } from 'protractor';
import { TodoListPage } from './todo-list.po';
import { protractor } from 'protractor/built/ptor';

export class TodoCreationPage {

  navigateTo() {
    return browser.get(`${browser.baseUrl}/create`) as Promise<any>;
  }

  typeTitle(text: string) {
    $('.create-todo-form .title-input input').sendKeys(text);
  }

  getErrorLabel() {
    return $('.create-todo-form .title-input mat-error');
  }

  isErrorLabelDisplayed() {
    return $('.create-todo-form .title-input mat-error').isPresent();
  }

  getTitle() {
    return $('.create-todo-form .title-input input').getAttribute('value');
  }

  eraseTitle() {
    this.getTitle().then(x => [...x].forEach(y => $('.create-todo-form .title-input input').sendKeys(protractor.Key.BACK_SPACE)));
  }

  typeDescription(text: string) {
    $('.create-todo-form .description-input textarea').sendKeys(text);
  }

  getCreationButtonStatus() {
    $('td-footer-actions #create-button').getAttribute('disabled');
  }

  createTodo() {
    $('td-footer-actions #create-button').click();
  }

  backToList() {
    $('td-footer-actions #back-button').click();
    return new TodoListPage();
  }
}
