import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Restaurant } from '@/components/restaurant';
import { styles, buttons } from '@/styles/global';
import { IconSymbol } from '@/components/ui/icon-symbol';

const API_URL = `${process.env.PUBLIC_API_URL}/restaurants/suggest/1`; // 👈 replace with your LAN IP

export default function Picker() {
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(true);

  // const handlePickSuggestion = () => {

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setSuggestion(data);
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
// };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍽️ Suggestion</Text>

      {/* <TouchableOpacity style={buttons.add} onPress={handlePickSuggestion}>
          <IconSymbol name="plus" size={28} color="white" />
        </TouchableOpacity> */}

      {suggestion ? (

        <Restaurant restaurant={suggestion} />
      ) : (
        <Text style={styles.empty}>No suggested restaurant</Text>
      )}
    </SafeAreaView>
  );
}