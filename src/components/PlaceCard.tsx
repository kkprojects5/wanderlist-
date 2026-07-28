import { StyleSheet, Text, View } from "react-native";

type PlaceCardProps = {
  name: string;
  category: string;
  notes: string;
};

export default function PlaceCard({ name, category, notes }: PlaceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <Text style={styles.notes}>{notes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f7",
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1c1c1e",
  },
  category: {
    fontSize: 13,
    color: "#8e8e93",
    textTransform: "uppercase",
  },
  notes: {
    fontSize: 15,
    color: "#3a3a3c",
    marginTop: 8,
  },
});