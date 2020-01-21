import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

export class MockedTodoService implements InMemoryDbService {

    createDb() {
        return {
            todos: [
                { id: 1, title: 'First todo', done: false, lastChange: Date.parse('2019-01-01'), },
                { id: 2, title: 'Second todo', done: true, lastChange: Date.parse('2019-02-01'), },
                { id: 3, title: 'Thrid todo', done: false, lastChange: Date.parse('2019-03-01'), },
                { id: 4, title: 'Fourth todo', done: true, lastChange: Date.parse('2019-04-01'), },
                { id: 5, title: 'Fifth todo', done: true, lastChange: Date.parse('2019-05-01'), },
                { id: 6, title: 'Sixth todo', done: true, lastChange: Date.parse('2019-06-01'), },
                { id: 7, title: 'Seventh todo', done: false, lastChange: Date.parse('2019-07-01'), },
                { id: 8, title: 'Eighth todo', done: true, lastChange: Date.parse('2019-08-01'), },
            ]
        };
    }

}
