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

export default function Index() {
  const { places } = usePlaces();

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.appName}>Wanderlist</Text>
        <Text style={styles.tagline}>Places you want to see</Text>
      </View>

      <Image
        source={{ uri: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800" }}
        style={styles.hero}
      />

      <View style={styles.badgeRow}>
        <Badge label="must-see" />
        <Badge label="budget" />
      </View>

        <Button 
          title="Load" 
          onPress={async () => console.log(await getCities())} 
        />
        
      <FlatList
        data={places}
        keyExtractor={(place) => place.id}
        contentContainerStyle={{ gap: 12, marginTop: 16 }}
        scrollEnabled={false}
        renderItem={({ item }: { item: Place }) => (
          <Link
              href={{
                pathname: "/place/[id]",
                params: { id: item.id },
              }}
              asChild
            >
              <Pressable>
                <PlaceCard 
                  id={item.id}
                  name={item.name}
                  notes={item.notes}
                  category={item.category}
                />
              </Pressable>
            </Link>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#8e8e93", textAlign: "center" }}>No places yet - add one on the Add tab</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12, flex: 1 },
  header: { paddingVertical: 8, alignItems: "center" },
  appName: { fontSize: 28, fontWeight: "700", textAlign: "center" },
  tagline: { fontSize: 14, color: "#8e8e93" },
  hero: { width: "100%", height: 160, borderRadius: 12 },
  badgeRow: { flexDirection: "row", gap: 8, paddingBottom: 8 },
});