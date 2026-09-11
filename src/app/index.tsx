import Badge from "@/components/Badge";
import PlaceCard from "@/components/PlaceCard";
import { Place } from "@/lib/types";
import { usePlaces } from "@/lib/places-context";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
} from "react-native";

import { Link } from "expo-router";
import { getCities } from "@/lib/api";
import { loadPlaces, savePlaces } from "@/lib/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  // no useState here any more. This screen reads the array, it does not own it. 
  const { places } = usePlaces();

  return (
    <FlatList
      data={places} 
      keyExtractor={(place) => place.id}
      contentContainerStyle={{ gap: 12, marginTop: 16 }}
      ListHeaderComponent={
        <View style={styles.headerBlock}>
          <View style={styles.header}>
            <Text style={styles.appName}>Wanderlist</Text>
            <Text style={styles.tagline}>
              Places you want to see
            </Text>
          </View>

          <Image
            source={{ uri: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800" }}
            style={styles.hero}
          />

          <View style={styles.badgeRow}>
            <Badge label="must-see" />
            <Badge label="budget" />
          </View>
        </View>
      }
      renderItem={({ item }: { item: Place }) => (
        <Link
          href={{
            pathname: "/place/[id]",
            params: {
              id: item.id,
              //name: item.name,
              //notes: item.notes,
              //category: item.category,
            },
          }}
          asChild // asChild tells the Link not to render its own wrapper.
        >
          <Pressable>
            <PlaceCard
              id={item.id}
              name={item.name}
              notes={item.notes || ""}
              category={item.category}
            />
          </Pressable>
        </Link>
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>
          No places yet - add one on the Add tab
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
    content: { padding: 16, gap: 12 },
    headerBlock: { gap: 12 },
    header: { paddingVertical: 8, alignItems: "center" },
    appName: { fontSize: 28, fontWeight: "700" },
    tagline: { fontSize: 14, color: "#548" },
    hero: { width: "100%", height: 160, borderRadius: 12 },
    badgeRow: { flexDirection: "row", gap: 8 },
    empty: { color: "#548", textAlign: "center", paddingVertical: 24 },
});