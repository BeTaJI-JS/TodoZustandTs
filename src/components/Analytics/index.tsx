import React, { useMemo, useState } from 'react';

import { Link } from 'react-router-dom';

import ChartItem from 'components/ChartItem';

import styles from './styles.module.scss';

const Analytics: React.FC = () => {
  const [diagramType, setDiagramType] = useState('pie');
  const [filterType, setFilterType] = useState('День');

  const configChart = useMemo(() => ({ diagramType, filterType }), [diagramType, filterType]);

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
      <ChartItem config={configChart} />
    </div>
  );
};

export default Analytics;
