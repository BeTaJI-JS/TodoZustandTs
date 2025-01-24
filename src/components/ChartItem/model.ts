import { ChartOptions, ChartTypeRegistry } from 'chart.js';

export interface ChartConfig {
  type: keyof ChartTypeRegistry; // Тип графика (line, bar, pie и т.д.)
  data: {
    labels: string[]; //названия элементов
    datasets: {
      label: string; // Название графика
      data: number[]; // Данные для отображения
      backgroundColor?: string[]; // Цвета для элементов графика
      borderColor?: string[]; // Цвета границ элементов
      borderWidth?: number; // Ширина границ
    }[];
  };
  options?: ChartOptions; // Дополнительные настройки графика (например, легенда, оси и т.д.)
}

// Пропсы компонента ChartItem
export interface ChartItemProps {
  config: ChartConfig;
}
