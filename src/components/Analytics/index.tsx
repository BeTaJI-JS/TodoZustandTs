import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Chart, ChartTypeRegistry, registerables } from 'chart.js';

import { useTodoStore } from 'store/todoStore';

import { filteredTasksHandler } from './helpers';
import styles from './styles.module.scss';

const Analytics: React.FC = () => {
  const [diagramType, setDiagramType] = useState('pie');
  const [filterType, setFilterType] = useState('День');

  const [tasks] = useTodoStore((state) => [state.tasks]);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // для хранения экземпляра графика

  const filteredTasks = useMemo(() => filteredTasksHandler(tasks, filterType), [tasks, filterType]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        Chart.register(...registerables);

        // Если экземпляр графика уже есть - удалить его
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // новый график
        chartInstanceRef.current = new Chart(ctx, {
          type: diagramType as keyof ChartTypeRegistry,
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
          // options: {
          //TODO  ... поиграться со св--вами натсройки канваса в конце
          // },
        });
      }
    }

    // Очистка при размонтировании компонента удалять канвас
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [tasks, diagramType, filteredTasks]);

  return (
    <div className={styles.analyticsContainer}>
      <h2>Аналитика</h2>
      <section>
        <button className={styles.homeIcon} onClick={() => window.history.back()} />
      </section>
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
      <canvas ref={chartRef} />
    </div>
  );
};

export default Analytics;
