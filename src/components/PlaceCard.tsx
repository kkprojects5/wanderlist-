import { Place } from "@/lib/types";
import { StyleSheet, Text, View } from "react-native";
//move to types.ts
//type PlaceCardProps = {
// id: string;
//name: string;
// notes: string;
// category: "city" | "nature" | "food" | "other"; 
//};

export default function PlaceCard({ id, name, category, 
  notes }: Place) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
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
    elevation: 2,
  },
  cardHeader: {
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