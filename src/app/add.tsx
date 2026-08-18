import { Place } from "@/lib/types";
import { usePlaces } from "@/lib/places-context";
import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function Add() {
  const { addPlace } = usePlaces();
  
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");

  type FormErrors = {
    name?: string;
    notes?: string;
    category?: string;
  };
  const [errors, setErrors] = useState<FormErrors>({});

  const clearForm = () => {
    setName("");
    setNotes("");
    setCategory("");
    setErrors({});
  };

  const handleAddPlace = () => {
    if (!validate()) return;

    const newPlace: Omit<Place, "id"> = { 
      name: name.trim(),
      notes: notes.trim(),
      category: category.trim().toLowerCase() as Place["category"],
    };

    addPlace(newPlace);
    clearForm();
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
      <Text style={{ color: "blue" }}>Place Form</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      {errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}
      
      <TextInput 
        value={notes} 
        onChangeText={setNotes} 
        placeholder="Notes" 
      />
      {errors.notes && (
        <Text style={{ color: "red" }}>{errors.notes}</Text>
      )}

      <TextInput 
        value={category} 
        onChangeText={setCategory} 
        placeholder="Category" 
      />
      {errors.category && (
        <Text style={{ color: "red" }}>{errors.category}</Text>
      )}

      <Button title="Add a Place" onPress={handleAddPlace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12 },
});

