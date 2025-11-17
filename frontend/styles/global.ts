// src/styles/global.ts
import { StyleSheet } from 'react-native';

const bastRestaurant = {
  fontSize: 14,
  fontWeight: '300',
};

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7', paddingHorizontal: 16, paddingTop: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontSize: 20, fontWeight: '300' },
  empty: { textAlign: 'center', marginTop: 40, color: '#777' },
  cuisine: bastRestaurant,
  lastVisit: bastRestaurant,
});