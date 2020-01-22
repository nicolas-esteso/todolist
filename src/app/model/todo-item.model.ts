export interface ITodoItem {
    id: number;
    title: string;
    done: boolean;
    description?: string;
    // Used for sorting purposes.
    lastChange: number;
}
