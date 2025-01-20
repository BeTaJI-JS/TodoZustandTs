import { useCallback, useState } from 'react';

import styles from './styles.module.scss';

interface InputProps {
  onAddTask: (title: string) => void;
}

const Input = ({ onAddTask }: InputProps) => {
  const [value, setValue] = useState('');

  const onAdd = useCallback(() => {
    onAddTask(value);
    setValue('');
  }, [onAddTask, value]);

  return (
    <div className={styles.inputTask}>
      <input
        className={styles.inputTaskValue}
        type='text'
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        placeholder='Добавьте задачу...'
      />
      <button onClick={onAdd} className={styles.inputTaskButton} />
    </div>
  );
};

export default Input;
