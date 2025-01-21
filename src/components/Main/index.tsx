import { Outlet } from 'react-router-dom';

import Analytics from 'components/Analytics';
import Input from 'components/Input';
import TodoItem from 'components/TodoItem';

import { useTodoStore } from 'store/todoStore';

import styles from './styles.module.scss';

const Main = () => {
  const [tasks, createTask, onEdit, onRemove, onDone] = useTodoStore((state) => [
    state.tasks,
    state.createTask,
    state.onEdit,
    state.onRemove,
    state.onDone,
  ]);

  console.log('tasks', tasks);

  // console.log('useTodoStore', useTodoStore);

  return (
    <>
      <article className={styles.article}>
        <h1 className={styles.articleTitle}>To do list</h1>
        <section className={styles.articleSection}>
          <Input onAddTask={createTask} />
        </section>
        <section className={styles.articleSection}>
          {!tasks.length ? (
            <p className={styles.articleSectionEmpty}>Нет активных задач</p>
          ) : (
            tasks.map((el) => <TodoItem item={el} key={el.id} onRemove={onRemove} onEdit={onEdit} onDone={onDone} />)
          )}
        </section>
      </article>
      <Outlet />
    </>
  );
};

export default Main;
