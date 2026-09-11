import { Place } from "@/lib/types";
import { FormErrors, isValid, validatePlaceForm } from "@/lib/validation";
import { usePlaces } from "@/lib/places-context";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function Add() {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  // the places is not here. It lives in the provider, above the tabs.
  const { addPlace } = usePlaces();

  const clearForm = () => {
    setName("");
    setNotes("");
    setCategory("");
    setErrors({});
  };

  function validate() {
    const next = validatePlaceForm({ name, notes, category });
    setErrors(next);
    return isValid(next);
  }

  const handleAdd = () => {
    if (!validate()) return;

    // hand the fields to the provider. it owns the array makes the id.
    addPlace({
      name: name.trim(),
      notes: notes.trim(),
      category: category.trim().toLowerCase() as Place["category"],
    });
    clearForm();
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Add a place</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#999"
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, styles.notesInput]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes"
        placeholderTextColor="#999"
        multiline
      />
      {errors.notes && <Text style={styles.error}>{errors.notes}</Text>}

      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
        placeholderTextColor="#999"
      />
      {errors.category && (
        <Text style={styles.error}>{errors.category}</Text>
      )}

      <Button title="Add a Place" onPress={handleAdd} />

      <Text style={styles.hint}>
        Added places appear on the Places tab.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: "700" },
  // A TextInput has no border of its own - without this it is an invisible
  // line of text on a white screen.
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  // multiline starts one line tall and grows; this gives it room up front.
  notesInput: { height: 90, textAlignVertical: "top" },
  error: { color: "red" },
  hint: { color: "#548", fontSize: 12 },
});