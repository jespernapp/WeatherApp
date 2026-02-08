import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WeatherData } from '@/types/weather';

interface WeatherCardProps {
    weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;

    return (
        <ThemedView></ThemedView>
    )
}

const styles = StyleSheet.create({
});
