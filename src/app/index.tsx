import PlaceCard from "@/components/PlaceCard";
import { Place } from "@/lib/types";
import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function Index() {
  // Variables
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  type FormErrors = {
    name?: string;
    notes?: string;
    category?: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});
 
  const cleanForm = () => {
    setName("");
    setNotes("");
    setCategory("");
    setErrors({});
  }

  const addPlace = () => {
    if (!validate())  return; 

    // Define the new Place Object to be added 
    const newPlace: Place = {
        id: Date.now().toString(),
        name: name.trim(), // name: name,
        notes: notes.trim(), // notes: notes,
        category: category.trim().toLowerCase() as Place["category"], //category: category
      }

    // Setter 
    setPlaces([
      //Load all places from Reat State 
      ...places, // I challenge you to remove this and test
      newPlace,
    ]);


    // lab 2 -  Clean states 
    // clean the entire state after post 
    cleanForm();

// Dev tool to debug
// console.log(places);
  };

function validate() {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!notes.trim()) next.notes = "Notes can't be empty.";
    const allowed = ["city", "nature", "food", "other"];
    if (!allowed.includes(category.trim().toLowerCase())) {
        next.category = `Category must be one of: ${allowed.join(", ")}.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.appName}>Wanderlist</Text>
        <Text style={styles.tagline}>Places you want to see</Text>
      </View>
    
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800"  }}
        style={styles.hero}
      />

       {places.map((placeObject) => (
        <PlaceCard
        key={placeObject.id}
        id={placeObject.id}
        name={placeObject.name}
        category={placeObject.category}
        notes={placeObject.notes}
        />
          ))}

{/* hardcoded placecard for testing 
      <PlaceCard 
        id="123"
        name="Kyoto" 
        category="city"
        notes="Temples in autumn"
      />
*/}
      <></>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />

      {errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}
      <TextInput
        value={notes}
        onChangeText={(text) => {
          setNotes(text);
          }}
        placeholder="Notes"
      />

      {errors.notes && (
          <Text style={{ color: "red" }}>{errors.notes} </Text>
      )}
      
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
      />

        {errors.category && (
        <Text style={{ color: "red" }}>{errors.category} </Text>      )}

      <Button title="Add a Place" onPress={addPlace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12 },
  header: { paddingVertical: 8, alignItems: "center" },
  appName: { fontSize: 28, fontWeight: "700", textAlign: "center" },
  tagline: { fontSize: 14, color: "#8e8e93" },
  hero: { width: "100%", height: 160, borderRadius: 12 },
});