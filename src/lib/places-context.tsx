import { Place } from "@/lib/types";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "wanderlist.places";

export async function savePlaces(places: Place[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(places));
}

export async function loadPlaces(): Promise<Place[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

type PlacesValue = {
  places: Place[];
  addPlace: (place: Omit<Place, "id">) => void;
  setPhoto: (id: string, photoUri?: string) => void;
};

// null is the "no provider above me" signal - usePlaces turns it into a real error.
const PlacesContext = createContext<PlacesValue | null>(null);

export function PlacesProvider({ children }: { children: ReactNode }) {
  // The array lives here, above the tab bar, so no single screen owns it.
  const [places, setPlaces] = useState<Place[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function load() {
      console.log("HERE-Load")
      setPlaces(await loadPlaces());// loading from storage
      setReady(true);
    }
    load();
  }, []);

  useEffect(() => {
    console.log("HERE - Save");
    if (!ready) return;
    savePlaces(places);
  }, [places, ready]); // toggle on/off these dependencies to test 

  const addPlace = (place: Omit<Place, "id">) => {
    setPlaces((current) => [
      ...current, // same immutability rule as Week 3 - a new array, never .push()
      { ...place, id: Date.now().toString() },
    ]);
  };

  const setPhoto = (id: string, photoUri?: string) => {
    setPlaces((current) =>
      current.map((place) =>
        place.id === id ? { ...place, photo: photoUri } : place
      )
    );
  };

  return (
    <PlacesContext.Provider value={{ places, addPlace, setPhoto }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  const value = useContext(PlacesContext);

  if (!value) {
    throw new Error("usePlaces must be used inside a PlacesProvider");
  }
  return value;
}