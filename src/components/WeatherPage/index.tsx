import { useEffect, useRef, useState } from 'react';

import { Chart, registerables } from 'chart.js';

const WeatherPage = () => {
  const [weatherData1, setWeatherData1] = useState<any>(null);
  const [weatherData2, setWeatherData2] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log('weatherData1', weatherData1);
  console.log('weatherData2', weatherData2);

  const city = 'Moscow';

  const apiKey1 = import.meta.env.VITE_API_KEY_1;
  const apiKey2 = import.meta.env.VITE_API_KEY_2;

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // для хранения экземпляра графика

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response1 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey1}&units=metric`,
        );
        const response2 = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey2}&q=${city}`);

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
          type: 'bar',
          data: {
            labels: ['OpenWeatherMap', 'WeatherAPI'],
            datasets: [
              {
                label: 'Temperature',
                data: [weatherData1.main?.temp || 0, weatherData2.current?.temp_c || 0],
                backgroundColor: ['rgba(252, 255, 81, 0.4)', 'rgba(170, 114, 238, 0.4)'],
                borderColor: ['rgb(114, 192, 75)'],
                borderWidth: 1,
                //  я хочу сделать цет текста labels разными
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
  }, [weatherData1, weatherData2]);

  if (loading) return <div>Loading...</div>;
  if (!weatherData1 || !weatherData2) return <div>Error loading data</div>;

  return (
    <div>
      <h2>Погода</h2>
      <section>
        <button onClick={() => window.history.back()} />
      </section>
      <canvas ref={chartRef} />
    </div>
  );
};

export default WeatherPage;
