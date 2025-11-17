import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, ActivityIndicator } from 'react-native';
import { Restaurant } from '@/components/restaurant';
import { styles } from '@/styles/global';

const API_URL = 'http://192.168.68.128:3000/restaurants/suggest/1'; // 👈 replace with your LAN IP

export default function Picker() {
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍽️ Suggestion</Text>

      {suggestion ? (
        <Restaurant restaurant={suggestion} />
      ) : (
        <Text style={styles.empty}>No suggested restaurant</Text>
      )}
    </SafeAreaView>
  );
}