import { ITodoItem } from '../model/todo-item.model';

export interface ITodoStore {
    store: IApplicationState;
}

export interface IApplicationState {
    // Determines if the application is loaded, i.e. if all the todos have been initialized.
    isLoaded: boolean;
    // The array containing the dodos
    todos: Array<ITodoItem>;
}
