import { StyleSheet, Text, View } from "react-native";

export default function Explorer() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Explore</Text>
      <Text>Live data arrives in Week 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
  note: { color: "rgb(255, 184, 41)" },
});