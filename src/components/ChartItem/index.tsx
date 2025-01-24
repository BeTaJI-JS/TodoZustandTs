import { useEffect, useRef } from 'react';

import { Chart, registerables } from 'chart.js';

import { ChartItemProps } from './model';

const ChartItem = ({ config }: ChartItemProps) => {
  console.log('chartConfig', config);

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

        // новый график c полученным конфигом
        chartInstanceRef.current = new Chart(ctx, {
          ...config,
        });
      }
    }

    // Очистка при размонтировании компонента удалять канвас
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [config]);

  return (
    <>
      <canvas ref={chartRef} />
    </>
  );
};

export default ChartItem;
