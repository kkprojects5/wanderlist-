import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { PlacesProvider } from "@/lib/places-context";

export default function TabLayout() {
  return (
    <PlacesProvider>
      <Tabs>

        <Tabs.Screen 
          name="add" 
          options={{
            title: "Add Places",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add" color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen 
          name="index" 
          options={{
            title: "Places",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
          }}
        />
          
        <Tabs.Screen 
          name="explore" 
          options={{ 
            title: "Explore",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="airplane" color={color} size={size} />
            ),
          }} 
        />

        <Tabs.Screen 
          name="settings" 
          options={{ 
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }} 
        />
      </Tabs>
    </PlacesProvider>
  );
}