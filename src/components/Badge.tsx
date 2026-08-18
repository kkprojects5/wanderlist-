import { StyleSheet, Text, View } from "react-native";

export default function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}  

const styles = StyleSheet.create({
  badge: { backgroundColor: "#e5e5ea", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 12, color: "#1c1c1e", fontWeight: "600" },
});