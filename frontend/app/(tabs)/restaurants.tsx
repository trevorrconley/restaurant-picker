import React, { useEffect, useState } from 'react';
import { Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Restaurant } from '@/components/restaurant';
import { styles, buttons } from '@/styles/global';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';

const API_URL = `${process.env.EXPO_PUBLIC_API_BASE_URL!}/restaurants`;

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePress = () => {
  router.push("../restaurant-modal");
};

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍽️ Restaurants</Text>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <Restaurant restaurant={item} />
        )}
      ListEmptyComponent={<Text style={styles.empty}>No restaurants found</Text>}
      />
      <TouchableOpacity style={buttons.add} onPress={handlePress}>
        <IconSymbol name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}