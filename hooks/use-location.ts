import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getCurrentLocation() {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setError('Permission to acces location was denied.');
                    setLoading(false);
                    return;
                }

                const position = await Location.getCurrentPositionAsync();
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLoading(false);
            } catch (err) {
                setError('Error fetching location.');
                setLoading(false);
            }
        }
        getCurrentLocation();
    }, []);
    return { location, loading, error };
}