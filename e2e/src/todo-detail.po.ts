import { browser, $ } from 'protractor';
import { TodoListPage } from './todo-list.po';

export class TodoDetailPage {
    navigateTo(todoId: number) {
        return browser.get(`${browser.baseUrl}/todo/${todoId}`) as Promise<any>;
    }

    getTodoStatus() {
        return $('td-todo-detail mat-toolbar mat-checkbox input').getAttribute('checked');
    }

    getTodoTitle() {
        return $('td-todo-detail mat-toolbar h2').getText();
    }

    getTitleDecoration() {
        return $('td-todo-detail mat-toolbar h2').getCssValue('text-decoration');
    }

    returnToList() {
        $('td-footer-actions button').click();
        return new TodoListPage();
    }
}
