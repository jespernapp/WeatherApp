import { useState, useEffect } from 'react';
import { fetchWeatherByCoordinates, fetchWeatherByCity, fetchForecast } from '@/services/weather-api';
import { WeatherData, ForecastDay } from '@/types/weather';

export function useWeather(latitude?: number, longitude?: number) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
}

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