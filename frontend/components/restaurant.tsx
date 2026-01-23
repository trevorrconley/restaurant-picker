import { styles } from "@/styles/global";
import { View, Text, Image } from "react-native";
import { cuisineImages } from "../app/images/cuisineImages";

console.log("cuisineImages", cuisineImages);

export function Restaurant({ restaurant }) {
  let cuisineKey = normalizeCuisine(restaurant.cuisine);

  if (!cuisineKey || !cuisineImages[cuisineKey]) {
    cuisineKey = "default";
  }

  // const imageSource = normalizeCuisine(cuisineImages[cuisineKey]) || cuisineImages.default;
  const imageSource = cuisineImages[cuisineKey] || cuisineImages.default;

  return (
    <View
      style={[
        styles.card,
        { flexDirection: "row", alignItems: "center" },
      ]}
    >
      <Image
        source={imageSource}
        style={{ width: 70, height: 70, borderRadius: 8, marginRight: 12 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        <Text style={styles.lastVisit}>{restaurant.visited_at}</Text>
      </View>
    </View>
  );
};

// function normalizeCuisine(cuisine) {
//   const value = cuisine != null ? String(cuisine).toLowerCase().trim() : undefined;

//   if (value === "sandwiches") return "sandwich";

//   console.log(value);

//   return value;
// }

function normalizeCuisine(cuisine) {
  if (cuisine == null) return undefined;

  const value = String(cuisine).toLowerCase().trim();

  if (value === "sandwiches") return "sandwich";

  return value;
};