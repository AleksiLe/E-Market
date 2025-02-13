import { Image, StyleSheet, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ textAlign: "center" }}>Shopping made simple for everyone</ThemedText>
        <ThemedText type="default" style={{ textAlign: "center" }}>Welcome to the E-Market</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //Make gap on top so that top bar on mobile does not get covered by the content
    paddingTop: 16,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
    paddingTop: 32,
  },
});