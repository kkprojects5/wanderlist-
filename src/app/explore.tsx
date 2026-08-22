import { City, getCities } from "@/lib/api";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Explore() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);
                setCities(await getCities());
            } catch (e) {
                setError(
                    "Could not load cities. Check your connection and try again.",
                );
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        <View>
            <Text style={styles.title}>Explore</Text>

            <FlatList
                data={cities}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <Text>{item.name}, {item.country} </Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
});
 