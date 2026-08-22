import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PlaceDetail() {
    const { name, category, notes } = useLocalSearchParams();

    return (
        <View style={styles.screen}>
            <Text style={styles.name}>{name}</Text>

            {/* Same pill shape as the Badge on the Places tab, so a category
                looks the same wherever it shows up. */}
            <View style={styles.badge}>
                <Text style={styles.category}>{category}</Text>
            </View>

            <Text style={styles.notes}>{notes || "No notes yet."}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, padding: 24, gap: 12 },
    name: { fontSize: 28, fontWeight: "700" },
    badge: {
        backgroundColor: "#eee8f5",
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 10,
        // Without this the pill stretches across the whole column.
        alignSelf: "flex-start",
    },
    category: {
        fontSize: 12,
        fontWeight: "600",
        color: "#548",
        textTransform: "uppercase",
    },
    notes: { fontSize: 16, lineHeight: 24, color: "#444" },
});
 