import React, { useEffect, useRef } from 'react';

import { Chart, registerables } from 'chart.js';

import { useTodoStore } from 'store/todoStore';

const Analytics: React.FC = () => {
  const [tasks] = useTodoStore((state) => [state.tasks]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // для хранения экземпляра графика

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
        //TODO  придумать динамичский селект на странице с аналитикой, по дням(1 день, неделя, месяц), по выполнено/не выполнено
        chartInstanceRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Done', 'Not done'],
            datasets: [
              {
                label: 'Tasks',
                data: [tasks.filter((task) => task.isDone).length, tasks.filter((task) => !task.isDone).length],
                backgroundColor: ['rgba(74, 193, 82, 0.2)', 'rgba(230, 34, 63, 0.2)'],
              },
            ],
          },
        });
      }
    }

    // Очистка при размонтировании компонента удалять канвас
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [tasks]);

  return (
    <div>
      <h2>Analytics</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Analytics;
