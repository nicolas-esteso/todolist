import { ITodoItem } from '../model/todo-item.model';
import { FormGroupState } from 'ngrx-forms';

export interface ITodoStore {
    store: IApplicationState;
}

export interface IApplicationState {
    // Determines if the application is loaded, i.e. if all the todos have been initialized.
    isLoaded: boolean;
    // The array containing the dodos
    todos: Array<ITodoItem>;
    // Object storing the content of the todo creation form.
    todoCreationForm: FormGroupState<ITodoCreationFormContent>;
}

export interface ITodoCreationFormContent {
    title: string;
    description: string;
}
