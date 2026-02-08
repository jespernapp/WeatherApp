import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

interface SearchBarProps {
    onSearch: (city: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
    const [city, setCity] = useState('');
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const iconColor = useThemeColor({}, 'icon');

    const handleSearch = () => {
        if (city.trim()) {
            onSearch(city.trim());
            setCity('');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder="Search city..."
                placeholderTextColor={iconColor}
                value={city}
                onChangeText={setCity}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <IconSymbol name="paperplane.fill" size={24} color={iconColor} />
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    searchButton: {
        padding: 4,
    },
});