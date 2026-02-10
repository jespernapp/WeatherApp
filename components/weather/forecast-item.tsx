import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ForecastDay } from '@/types/weather';

interface ForecastItemProps {
    forecast: ForecastDay;
}

export function ForecastItem({ forecast }: ForecastItemProps) {
    const date = new Date(forecast.date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return (
        <ThemedView style={styles.container}>
            <View style={styles.dateContainer}>
                <ThemedText type="defaultSemiBold" style={styles.dayName}>
                    {dayName}
                </ThemedText>
                <ThemedText style={styles.date}>{monthDay}</ThemedText>
            </View>

            <View style={styles.conditionContainer}>
                <ThemedText style={styles.condition}>{forecast.condition}</ThemedText>
            </View>

            <View style={styles.tempContainer}>
                <ThemedText type="defaultSemiBold" style={styles.tempMax}>
                    {forecast.tempMax}°
                </ThemedText>
                <ThemedText style={styles.tempMin}>{forecast.tempMin}°</ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    dateContainer: {
        flex: 1,
    },
    dayName: {
        fontSize: 16,
        marginBottom: 2,
    },
    date: {
        fontSize: 14,
        opacity: 0.6,
    },
    conditionContainer: {
        flex: 2,
        alignItems: 'center',
    },
    condition: {
        fontSize: 14,
    },
    tempContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    tempMax: {
        fontSize: 18,
    },
    tempMin: {
        fontSize: 18,
        opacity: 0.5,
    }
});