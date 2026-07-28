import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import PlaceCard from "../components/PlaceCard";
const APP_NAME = "Wanderlist";
const TAGLINE = "Places worth the detour.";

export default function Index() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.tagline}>{TAGLINE}</Text>
      </View>

      <Image
        style={styles.hero}
        source={{ uri: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800" }}
      />

      <PlaceCard name="Kyoto" category="city" notes="Temples in autumn" />
      <PlaceCard name="Banff" category="nature" notes="Lake Louise at sunrise" />
      <PlaceCard name="Lisbon" category="food" notes="Pasteis de nata tour" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 16,
    paddingTop: 60,
    gap: 12,
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1c1c1e",
  },
  tagline: {
    fontSize: 15,
    color: "#8e8e93",
    marginTop: 4,
  },
  hero: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },
});