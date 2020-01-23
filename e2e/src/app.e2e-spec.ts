import { TodoListPage } from './todo-list.po';
import { browser, logging } from 'protractor';
import { TodoDetailPage } from './todo-detail.po';
import { TodoCreationPage } from './todo-creation.po';

describe('workspace-project App', () => {
  let page: TodoListPage;

  beforeEach(() => {
    page = new TodoListPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Overkill TODO List');
  });

  it('should reorder the item when they are done', () => {
    const nbTodos = 8;
    page.navigateTo();

    expect(page.getTodoStatus(2)).toBeFalsy();
    expect(page.getAllTodos().count()).toEqual(nbTodos);
    const todoLabel = page.getTodoLabel(2);
    const lastTodoLabel = page.getTodoLabel(nbTodos - 1);
    expect(todoLabel).not.toEqual(lastTodoLabel);

    // Click todo 2. This todo is supposed to be undone and it's supposed to be updated to done
    // and to be moved at the bottom of the list.
    page.doTodo(2);

    expect(page.getAllTodos().count()).toEqual(nbTodos);

    // Check that the TODO has been moved and that it has been updated.
    expect(page.getTodoLabel(nbTodos - 1)).toEqual(todoLabel);
    expect(page.getTodoStatus(nbTodos - 1)).toBeTruthy();
  });

  it('should reorder the item when they are undone', () => {
    const nbTodos = 8;
    page.navigateTo();

    expect(page.getTodoStatus(7)).toBeTruthy();
    expect(page.getAllTodos().count()).toEqual(nbTodos);
    const todoLabel = page.getTodoLabel(7);
    const firstTodoLabel = page.getTodoLabel(0);
    expect(todoLabel).not.toEqual(firstTodoLabel);

    // Click todo 7. This todo is supposed to be done and it's supposed to be updated to undone
    // and to be moved at the top of the list.
    page.doTodo(7);

    expect(page.getAllTodos().count()).toEqual(nbTodos);

    // Check that the TODO has been moved and that it has been updated.
    expect(page.getTodoLabel(0)).toEqual(todoLabel);
    expect(page.getTodoStatus(0)).toBeFalsy();
  });

  it('should display the detail of a TODO', () => {
    const nbTodos = 8;
    page.navigateTo();

    expect(page.getTodoStatus(7)).toBeTruthy();
    expect(page.getAllTodos().count()).toEqual(nbTodos);

    let todoLabel = page.getTodoLabel(2);
    expect(page.getTodoStatus(2)).toBeFalsy();

    let detail: TodoDetailPage = page.enterTodoDetail(2);
    expect(detail.getTodoStatus()).toBeFalsy();
    expect(detail.getTodoTitle()).toEqual(todoLabel);
    expect(detail.getTitleDecoration()).not.toContain('line-through');

    page = detail.returnToList();
    todoLabel = page.getTodoLabel(7);
    expect(page.getTodoStatus(7)).toBeTruthy();

    detail = page.enterTodoDetail(7);
    expect(detail.getTodoStatus()).toBeTruthy();
    expect(detail.getTodoTitle()).toEqual(todoLabel);
    expect(detail.getTitleDecoration()).toContain('line-through');
  });

  it('should create a new TODO', () => {
    new TodoCreationPage().navigateTo();

    const nbTodos = 8;
    const creationPage = new TodoCreationPage();
    const newTodoName = 'A new TODO';
    const newTodoDesc = 'DESC';
    expect(creationPage.getCreationButtonStatus()).toBeFalsy();
    creationPage.typeTitle(newTodoName);
    expect(creationPage.getCreationButtonStatus()).toBeUndefined();
    creationPage.typeDescription(newTodoDesc);
    creationPage.createTodo();
    const todoListPage: TodoListPage = new TodoListPage();
    expect(todoListPage.getAllTodos().count()).toEqual(nbTodos + 1);
    expect(todoListPage.getTodoLabel(0)).toEqual(newTodoName);

    todoListPage.enterTodoDetail(0);
    const detailPage = new TodoDetailPage();
    expect(detailPage.getTodoTitle()).toEqual(newTodoName);
    expect(detailPage.getTodoDescription()).toEqual(newTodoDesc);
    expect(detailPage.getTodoStatus()).toBeFalsy();
  });

  it('should not be possible to create a TODO without a title', () => {
    new TodoCreationPage().navigateTo();

    const creationPage = new TodoCreationPage();
    expect(creationPage.getCreationButtonStatus()).toBeFalsy();
    creationPage.typeTitle('TODO');
    creationPage.eraseTitle();
    expect(creationPage.getTitle()).toEqual('');
    expect(creationPage.isErrorLabelDisplayed()).toBeTruthy();
    expect(creationPage.getErrorLabel().getText()).toContain('Title is mandatory');
    expect(creationPage.getCreationButtonStatus()).toBeFalsy();

    creationPage.typeTitle('TODO');
    expect(creationPage.getTitle()).toEqual('TODO');
    expect(creationPage.isErrorLabelDisplayed()).toBeFalsy();
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
