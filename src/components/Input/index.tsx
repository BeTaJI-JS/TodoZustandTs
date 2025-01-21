import { useCallback, useState } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

interface InputProps {
  onAddTask: (title: string) => void;
}

const Input = ({ onAddTask }: InputProps) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const onAdd = useCallback(() => {
    if (value.length > 0 && value.trim()) {
      onAddTask(value);
      setValue('');
      setError(false);
    } else {
      setError(true);
    }
  }, [onAddTask, value]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 0) {
      setValue(e.target.value);
      setError(false);
    }
  }, []);

  return (
    <>
      <div className={styles.inputTask}>
        <input
          className={cn(styles.inputTaskValue, { [styles.inputTaskError]: error })}
          type='text'
          onChange={onChange}
          value={value}
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
          placeholder='Добавьте задачу...'
        />
        <button onClick={onAdd} className={styles.inputTaskButton} />
        {error && <div className={styles.inputTaskErrorText}>Введите название задачи</div>}
      </div>
    </>
  );
};

export default Input;
