import { styles } from "@/styles/global";
import { View, Text } from 'react-native';

export function Restaurant({ restaurant }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
      <Text style={styles.lastVisit}>{restaurant.visited_at}</Text>
    </View>
  );
}