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
        <ThemedView style={styles.card}>
            <ThemedText type="title" style={styles.location}>
                {weather.location}, {weather.country}
            </ThemedText>

            <View style={styles.mainInfo}>
                <ThemedText style={styles.temperature}>
                    {weather.temperature}°C
                </ThemedText>
                <ThemedText type="subtitle" style={styles.condition}>
                    {weather.condition}
                </ThemedText>
                <ThemedText style={styles.description}>
                    {weather.description}
                </ThemedText>
            </View>

            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>
                        Feels like
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                        {weather.feelsLike}°C
                    </ThemedText>
                </View>

                <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>
                        Humidity
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                        {weather.humidity}%
                    </ThemedText>
                </View>

                <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel}>
                        Wind Speed
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                        {weather.windSpeed} m/s
                    </ThemedText>
                </View>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    location: {
        textAlign: 'center',
        marginBottom: 20,
    },
    mainInfo: {
        alignItems: 'center',
        marginBottom: 30,
    },
    temperature: {
        fontSize: 72,
        fontWeight: 'bold',
        marginBottom: 8,        
    },
    condition: {
        marginBottom: 4,
    },
    description: {
        fontSize: 16,
        opacity: 0.7,
        textTransform: 'capitalize',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(128, 128, 128, 0.2)',  
    },
    detailItem: {
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 14,
        opacity: 0.6,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 18,
        fontWeight: '600',
    },
});
