import { ActivityIndicator, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { SearchBar } from "@/components/weather/search-bar";
import { WeatherCard } from "@/components/weather/weather-card";
import { ForecastItem } from "@/components/weather/forecast-item";
import { useLocation } from "@/hooks/use-location";
import { useWeather } from "@/hooks/use-weather";
import { useState } from 'react';

export default function HomeScreen() {
  const { location, loading: locationLoading, error: locationError } = useLocation();
  const { weather, forecast, loading, error, searchCity, refreshWeather } =
    useWeather(location?.latitude, location?.longitude);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (location) {
      setRefreshing(true);
      await refreshWeather(location.latitude, location.longitude);
      setRefreshing(false);
    }
  };
  const handleSearch = (city: string) => {
    searchCity(city);
  };

  if (locationLoading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.message}>Getting your location...</ThemedText>
      </ThemedView>
    );
  }
  if (locationError) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.error}>{locationError}</ThemedText>
        <ThemedText style={styles.message}>You can still search for a city!</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <ThemedText type="title" style={styles.title}>
          Weather Forecast
        </ThemedText>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <ThemedView style={styles.centered}>
            <ActivityIndicator size="large" />
          </ThemedView>
        )}

        {error && (
          <ThemedView style={styles.errorContainer}>
            <ThemedText style={styles.error}>{error}</ThemedText>
          </ThemedView>
        )}

        {weather && !loading && (
          <>
            <WeatherCard weather={weather} />
            {forecast.length > 0 && (
              <ThemedView style={styles.forecastSection}>
                <ThemedText type="subtitle" style={styles.forecastTitle}>
                  5-Day Forecast
                </ThemedText>
                {forecast.map((day) => (
                  <ForecastItem key={day.date} forecast={day} />
                ))}
              </ThemedView>
            )}
          </>
        )}
      </ScrollView>
    </ThemedView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    marginTop: 60,
    marginBottom: 30,
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    marginTop: 16,
    textAlign: "center",
  },
  errorContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  error: {
    color: "#ff4444",
    textAlign: "center",
  },
  forecastSection: {
    marginTop: 10,
  },
  forecastTitle: {
    marginBottom: 16,
  },
});