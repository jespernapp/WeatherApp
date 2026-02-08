export interface WeatherData {
    location: string;
    country: string;
    temperature: number;
    feelsLike: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
}

export interface ForecastDay {
    date: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    icon: string;
}

export interface WeatherResponse {
    current: WeatherData;
    forecast: ForecastDay[];
}