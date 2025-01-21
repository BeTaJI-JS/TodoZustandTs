import create, { State, StateCreator } from 'zustand';

export interface Task {
  id: number;
  title: string;
  createdAt: number;
  isDone: boolean;
}

interface TodoStore {
  tasks: Task[];
  createTask(title: string): void;
  onEdit(taskId: number, title: string): void;
  onRemove(taskId: number): void;
  onDone(taskId: number): void;
}

const localStorageUpdate =
  <T extends State & { tasks: Task[] }>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        set(nextState, ...args);

        const currentState = get();

        window.localStorage.setItem('tasks', JSON.stringify(currentState.tasks));
      },
      get,
      api,
    );

const initialStateTasks = JSON.parse(window.localStorage.getItem('tasks') || '[]') as Task[];

export const useTodoStore = create<TodoStore>(
  localStorageUpdate((set) => ({
    tasks: initialStateTasks,
    createTask: (title: string) =>
      set((state) => ({
        tasks: [...state.tasks, { id: Date.now(), title, createdAt: Date.now(), isDone: false }],
      })),
    onEdit: (taskId: number, title: string) =>
      set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, title };
          }
          return task;
        }),
      })),
    onRemove: (taskId: number) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      })),
    onDone: (taskId: number) =>
      set((state) => ({
        tasks: state.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone: !task.isDone };
          }
          return task;
        }),
      })),
  })),
);
