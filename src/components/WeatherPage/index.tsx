import { useCallback, useEffect, useMemo, useState } from 'react';

import ChartItem from 'components/ChartItem';
import { ChartConfig } from 'components/ChartItem/model';

const WeatherPage = () => {
  const [weatherData1, setWeatherData1] = useState<any>(null);
  const [weatherData2, setWeatherData2] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log('weatherData1', weatherData1);
  console.log('weatherData2', weatherData2);

  const city = 'Moscow';

  const apiKey1 = import.meta.env.VITE_API_KEY_1;
  const apiKey2 = import.meta.env.VITE_API_KEY_2;

  const groupDataByDay = useCallback((data) => {
    const groupedData = {};

    data.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0]; // Извлекаем дату (без времени)
      if (!groupedData[date]) {
        groupedData[date] = {
          temps: [],
          humidity: [],
        };
      }
      groupedData[date].temps.push(item.main.temp);
      groupedData[date].humidity.push(item.main.humidity);
    });

    return groupedData;
  }, []);

  const processWeatherData = useCallback(
    (data1, data2) => {
      if (!data1 || !data2) return null;

      // Группируем данные по дням для OpenWeatherMap
      const owmGroupedData = groupDataByDay(data1, data2);

      // Извлекаем данные для OpenWeatherMap
      const owmLabels = Object.keys(owmGroupedData).map((date) => {
        const [year, month, day] = date.split('-');
        return `${parseInt(day)} ${new Date(year, month - 1).toLocaleString('default', { month: 'long' })}`;
      });
      const owmTemperatures = owmLabels.map((date, index) => {
        const temps = owmGroupedData[Object.keys(owmGroupedData)[index]].temps;
        return (temps.reduce((sum, temp) => sum + temp, 0) / temps.length).toFixed(1); // Средняя температура
      });

      console.log('owmLabels', owmLabels);

      // Извлекаем данные для WeatherAPI
      // const waLabels = data2.forecast.forecastday.map((day) => day.date);
      const waTemperatures = data2.forecast.forecastday.map((day) => day.day.avgtemp_c);

      return {
        labels: owmLabels, // Используем метки от OpenWeatherMap
        datasets: [
          {
            label: 'OpenWeatherMap Temperature',
            data: owmTemperatures,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'WeatherAPI Temperature',
            data: waTemperatures,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    },
    [groupDataByDay],
  );

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response1 = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey1}&units=metric`,
        );

        const response2 = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey2}&q=${city}&days=16`);

        const data1 = await response1.json();
        const data2 = await response2.json();
        console.log('data1', data1);
        console.log('data2', data2);

        setWeatherData1(data1);
        setWeatherData2(data2);
      } catch (error) {
        console.error('Ошбка в получении данных', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, apiKey1, apiKey2]);

  const configChart = useMemo(
    () => ({
      type: 'line',
      data: processWeatherData(weatherData1, weatherData2),
      // options: {
      //TODO  ... поиграться со св--вами натсройки канваса в конце
      // },
    }),
    [weatherData1, weatherData2, processWeatherData],
  );

  console.log('processWeatherData', processWeatherData(weatherData1, weatherData2));

  if (loading) return <div>Loading...</div>;
  if (!weatherData1 || !weatherData2) return <div>Error loading data</div>;

  return (
    <div>
      <h2>Погода</h2>
      <section>
        <button onClick={() => window.history.back()} />
      </section>
      {/* <canvas ref={chartRef} /> */}
      <ChartItem config={configChart as ChartConfig} />
    </div>
  );
};

export default WeatherPage;
