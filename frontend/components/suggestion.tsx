import { styles } from "@/styles/global";
import { View, Text } from 'react-native';

export function Restaurant({ selected }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{selected.name}</Text>
    </View>
  );
}