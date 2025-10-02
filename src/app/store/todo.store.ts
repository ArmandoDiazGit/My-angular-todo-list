import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TodoItem } from './todo.model';

type TodoState = {
  todos: TodoItem[];
};

const initialState: TodoState = {
  todos: [
    { title: 'Brush teeth', isCompleted: false, id: Date.now().toString() },
  ],
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addTodo(addTodo: string) {
      patchState(store, {
        todos: [
          {
            title: addTodo,
            id: Date.now().toString(),
            isCompleted: false,
          },
          ...store.todos(),
        ],
      });
    },
    toggleTodo(id: string) {
      patchState(store, {
        todos: store.todos().map((item) => {
          if (id === item.id) {
            return {
              ...item,
              isCompleted: !item.isCompleted,
            };
          }
          return item;
        }),
      });
    },
    deleteTodo(id: string) {
      patchState(store, {
        todos: store.todos().filter((todo) => todo.id !== id),
      });
    },
  }))
);
