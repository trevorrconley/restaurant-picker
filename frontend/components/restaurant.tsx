import { styles } from "@/styles/global";
import { View, Text, Image } from "react-native";
import { cuisineImages } from "../app/images/cuisineImages";

export function Restaurant({ restaurant }) {
  const cuisineKey = restaurant.cuisine?.toLowerCase();
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
}
