import { Place } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

type PlacesValue = {
  places: Place[];
  addPlace: (place: Omit<Place, "id">) => void;
};
// null is the "no provider above me" signal - usePlaces turns it into a real error.
const PlacesContext = createContext<PlacesValue | null>(null);

export function PlacesProvider({ children }: { children: ReactNode }) {
  // The array lives here, above the tab bar, so no single screen owns it.
  const [places, setPlaces] = useState<Place[]>([]);

  const addPlace = (place: Omit<Place, "id">) => {
    setPlaces((current) => [
      ...current, // same immutability rule as Week 3 - a new array, never .push()
      { ...place, id: Date.now().toString() },
    ]);
  };

  return (
    <PlacesContext.Provider value={{ places, addPlace }}>
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