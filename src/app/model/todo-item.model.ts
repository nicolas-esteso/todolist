export interface ITodoItem {
    id: number;
    title: string;
    done: boolean;
    description?: string;
    // Used for sorting purposes.
    lastChange: number;
}

export interface ITodoCreationData {
    title: string;
    description: string;
}
