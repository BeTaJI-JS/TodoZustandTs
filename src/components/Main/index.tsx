import { useMemo, useState } from 'react';

import cn from 'classnames';
import { Link, Outlet } from 'react-router-dom';

import Input from 'components/Input';
import TodoItem from 'components/TodoItem';

import { useTodoStore } from 'store/todoStore';

import styles from './styles.module.scss';

const Main = () => {
  const [filter, setFilter] = useState('all');

  const [tasks, createTask, onEdit, onRemove, onDone] = useTodoStore((state) => [
    state.tasks,
    state.createTask,
    state.onEdit,
    state.onRemove,
    state.onDone,
  ]);

  console.log('tasks', tasks);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filter === 'all') {
          return task;
        }
        if (filter === 'done') {
          return task.isDone;
        }
        if (filter === 'notDone') {
          return !task.isDone;
        }
      }),
    [filter, tasks],
  );

  console.log('filteredTasks', filteredTasks);
  console.count('filteredTasks count');

  // console.log('useTodoStore', useTodoStore);

  return (
    <>
      <article className={styles.article}>
        <h1 className={styles.articleTitle}>To do list</h1>

        <nav className={styles.articleNav}>
          <button
            className={cn(styles.articleNavBtn, { [styles.articleNavBtnActive]: filter === 'all' })}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button
            className={cn(styles.articleNavBtn, { [styles.articleNavBtnActive]: filter === 'done' })}
            onClick={() => setFilter('done')}
          >
            Завершенные
          </button>
          <button
            className={cn(styles.articleNavBtn, { [styles.articleNavBtnActive]: filter === 'notDone' })}
            onClick={() => setFilter('notDone')}
          >
            Не завершенные
          </button>
          <button className={styles.articleNavBtn}>
            <Link to='/analytics' className={styles.articleNavLink}>
              Аналитика
            </Link>
          </button>
        </nav>
        <section className={styles.articleSection}>
          <Input onAddTask={createTask} />
        </section>
        <section className={styles.articleSection}>
          {!tasks.length ? (
            <p className={styles.articleSectionEmpty}>Нет активных задач</p>
          ) : (
            filteredTasks.map((el) => (
              <TodoItem item={el} key={el.id} onRemove={onRemove} onEdit={onEdit} onDone={onDone} />
            ))
          )}
        </section>
      </article>
      <Outlet />
    </>
  );
};

export default Main;
