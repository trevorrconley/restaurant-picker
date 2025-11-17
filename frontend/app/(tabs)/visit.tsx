import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, ActivityIndicator } from 'react-native';
import { Restaurant } from '@/components/restaurant';
import { styles } from '@/styles/global';

const API_URL = 'http://192.168.68.128:3000/visits'; // 👈 replace with your LAN IP

export default function Visit() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error('Error fetching visits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
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
      <Text style={styles.title}>Visits</Text>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <Restaurant restaurant={item} />
        )}
      ListEmptyComponent={<Text style={styles.empty}>No visits found</Text>}
      />
    </SafeAreaView>
  );
}