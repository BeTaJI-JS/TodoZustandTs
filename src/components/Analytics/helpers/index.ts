import { Task } from 'store/todoStore';

export const filteredTasksHandler = (tasks: Task[], filterType: string) =>
  tasks.filter((task) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    switch (filterType) {
      case 'day':
        return task.createdAt >= startOfDay.getTime() && task.createdAt < endOfDay.getTime();
      case 'week': {
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6 - today.getDay());
        return task.createdAt >= startOfWeek.getTime() && task.createdAt < endOfWeek.getTime();
      }
      case 'month': {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return task.createdAt >= startOfMonth.getTime() && task.createdAt < endOfMonth.getTime();
      }
      default:
        return task.createdAt >= startOfDay.getTime() && task.createdAt < endOfDay.getTime();
    }
  });
