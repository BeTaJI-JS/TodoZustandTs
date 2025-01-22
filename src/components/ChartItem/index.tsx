import { useEffect, useMemo, useRef } from 'react';

import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { filteredTasksHandler } from 'helpers';

import { useTodoStore } from 'store/todoStore';

//! Переписать на нормальный конфиг который будет универсальным а не это
interface ChartItemProps {
  config: {
    filterType: string;
    diagramType: string;
  };
}

const ChartItem = ({ config }: ChartItemProps) => {
  const { filterType, diagramType } = config;

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // для хранения экземпляра графика

  const [tasks] = useTodoStore((state) => [state.tasks]);

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
    <>
      <canvas ref={chartRef} />
    </>
  );
};

export default ChartItem;
