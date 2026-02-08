import { useState, useEffect } from 'react';
import { fetchWeatherByCoordinates, fetchWeatherByCity, fetchForecast } from '@/services/weather-api';
import { WeatherData, ForecastDay } from '@/types/weather';

export function useWeather(latitude?: number, longitude?: number) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

const transformWeatherData = (data: any): WeatherData => ({
    location: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
});

const transformForecastData = (data: any): ForecastDay[] => {
    const dailyForecasts: { [key: string]: any } = {};

    data.list.forEach((item: any) => {
        const date = item.dt_txt.split(' ')[0];
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
                date,
                temps: [item.main.temp],
                condition: item.weather[0].main,
                icon: item.weather[0].icon,
            };
        } else {
            dailyForecasts[date].temps.push(item.main.temp);
        }
    });

    return Object.values(dailyForecasts).slice(0, 5).map((day: any) => ({
        date: day.date,
        tempMax: Math.round(Math.max(...day.temps)),
        tempMin: Math.round(Math.min(...day.temps)),
        condition: day.condition,
        icon: day.icon,
    }));
};

const loadWeather = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);

    try {
        const [WeatherData, forecastData] = await Promise.all([
            fetchWeatherByCoordinates(lat, lon),
            fetchForecast(lat, lon),
        ]);
        setWeather(transformWeatherData(WeatherData));
        setForecast(transformForecastData(forecastData));
    } catch (err) {
        setError('Error fetching weather data.');
        console.error(err);
    } finally {
        setLoading(false);
    }
};

const searchCity = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
        const weatherData = await fetchWeatherByCity(city);
        const forecastData = await fetchForecast(weatherData.coord.lat, weatherData.coord.lon);
        
        setWeather(transformWeatherData(weatherData));
        setForecast(transformForecastData(forecastData));
    } catch (err) {
        setError('City not found.');
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    if (latitude && longitude) {
        loadWeather( latitude, longitude );
    }
}, [latitude, longitude]);

return { weather, forecast, loading, error, searchCity, refreshWeather: loadWeather };
}
