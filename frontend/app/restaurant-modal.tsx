import { StyleSheet, Button, View, Pressable, Text } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import { buttons, modals } from "@/styles/global";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export const modal = true

export default function RestaurantModal() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={modals.container}>
      <SafeAreaView>
            <Text style={modals.restaurantName}>Retaurant Name</Text>
            <Text style={modals.restaurantCuisine}>Restaruant Cuisine</Text>
      </SafeAreaView>
      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: insets.bottom || 20 }, // <-- pushes above nav bar
        ]}
      >
        <Pressable style={buttons.leftButton} onPress={() => router.back()}>
          <Text style={buttons.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable style={buttons.rightButton} onPress={() => router.back()}>
          <Text style={buttons.buttonText}>Save</Text>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
