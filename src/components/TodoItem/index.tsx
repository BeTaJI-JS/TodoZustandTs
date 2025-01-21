import React, { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

interface TodoItemProps {
  id: number;
  title: string;
  createdAt: number;
  isDone: boolean;
  onRemove: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onDone: (id: number) => void;
}
const TodoItem: React.FC<TodoItemProps> = ({ id, title, isDone, onRemove, onEdit, onDone }) => {
  const [checked, setChecked] = useState(false);
  const [isEdit, setIsedit] = useState(false);
  const [value, setValue] = useState(title);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit) {
      editInputRef.current?.focus();
    }
  }, [isEdit]);

  return (
    <div className={styles.inputTask}>
      <input
        type='checkbox'
        disabled={isEdit}
        checked={checked}
        className={styles.inputTaskCheckbox}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
      <label className={styles.inputTaskLabel}>
        {isEdit ? (
          <input
            ref={editInputRef}
            className={styles.inputTaskEditTitle}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEdit(id, value);
                setIsedit(false);
              }
            }}
          />
        ) : (
          <h3
            className={cn(styles.inputTaskTitle, { [styles.inputTaskTitleDone]: isDone })}
            onClick={() => {
              onDone(id);
            }}
          >
            {title}
          </h3>
        )}
      </label>
      {isEdit ? (
        <button
          aria-label='Save'
          className={styles.inputTaskSave}
          onClick={() => {
            onEdit(id, value);
            setIsedit(false);
          }}
        />
      ) : (
        <button
          aria-label='Edit'
          className={styles.inputTaskEdit}
          onClick={() => setIsedit(!isEdit)}
          disabled={!checked}
        />
      )}
      <button
        aria-label='Delete'
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm('Вы уверены?')) {
            onRemove(id);
          }
        }}
      />
    </div>
  );
};

export default TodoItem;
