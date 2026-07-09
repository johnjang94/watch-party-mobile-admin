import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PageCard({ title, subtitle, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(4, 10, 7, 0.68)",
    borderColor: "rgba(222, 255, 227, 0.12)",
    borderWidth: 1,
    borderRadius: 28,
    padding: 18,
    gap: 8,
  },
  title: {
    color: "#f3fff5",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -1,
  },
  subtitle: {
    color: "#b2c9b7",
    fontSize: 14,
  },
  content: {
    gap: 10,
  },
});
