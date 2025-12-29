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

export const buttons = StyleSheet.create({
  add: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#cccccc",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  leftButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },

  rightButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});