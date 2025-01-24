import React, { useMemo, useState } from 'react';

import { filteredTasksHandler } from 'helpers';
import { Link } from 'react-router-dom';

import ChartItem from 'components/ChartItem';
import { ChartConfig } from 'components/ChartItem/model';

import { useTodoStore } from 'store/todoStore';

import styles from './styles.module.scss';

const Analytics: React.FC = () => {
  const [diagramType, setDiagramType] = useState('pie');
  const [filterType, setFilterType] = useState('День');

  const [tasks] = useTodoStore((state) => [state.tasks]);

  const filteredTasks = useMemo(() => filteredTasksHandler(tasks, filterType), [tasks, filterType]);

  const configChart = useMemo(
    () => ({
      type: diagramType,
      data: {
        labels: ['Done', 'Not done'],
        datasets: [
          {
            label: 'Tasks',
            data: [
              filteredTasks.filter((task) => task.isDone).length,
              filteredTasks.filter((task) => !task.isDone).length,
            ],
            backgroundColor: ['rgb(1, 254, 18)', 'rgba(250, 2, 2, 0.97)'],
          },
        ],
      },
    }),
    [diagramType, filteredTasks],
  );

  return (
    <div className={styles.analyticsContainer}>
      <h2>Аналитика</h2>
      <section>
        <button className={styles.homeIcon} onClick={() => window.history.back()} />
      </section>
      <button>
        <Link to='/weatherApi'>Погода API</Link>
      </button>
      <section>
        <div>Тип графика</div>
        <select onChange={(e) => setDiagramType(e.target.value)}>
          <option value='pie'>Пирог</option>
          <option value='line'>Линия</option>
          <option value='polarArea'>Полярная</option>
          <option value='radar'>Радар</option>
          <option value='doughnut'>Пончик</option>
        </select>
        <div>Фильтры</div>
        <select name='analytycsTask' onChange={(e) => setFilterType(e.target.value)}>
          <option value='day'>День</option>
          <option value='week'>Неделя</option>
          <option value='month'>Месяц</option>
        </select>
      </section>
      <ChartItem config={configChart as ChartConfig} />
    </div>
  );
};

export default Analytics;
