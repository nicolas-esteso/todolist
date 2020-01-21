import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
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

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
