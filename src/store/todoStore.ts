import create from 'zustand';

export interface Task {
  id: number;
  title: string;
  createdAt: number;
}

interface TodoStore {
  tasks: Task[];
  createTask(title: string): void;
  onEdit(taskId: number, title: string): void;
  onRemove(taskId: number): void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  tasks: [
    {
      id: 1,
      title: 'Task 1',
      createdAt: Date.now(),
    },
    {
      id: 2,
      title: 'Task 2',
      createdAt: Date.now(),
    },
  ],
  createTask: (title: string) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), title, createdAt: Date.now() }],
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
}));
