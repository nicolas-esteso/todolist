export interface ITodoItem {
    id: number;
    title: string;
    done: boolean;
    // Used for sorting purposes.
    creationDate: number;
}