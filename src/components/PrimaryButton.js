import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function PrimaryButton({ label, onPress, wide = false }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, wide && styles.wide]}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffd24d",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  wide: {
    width: "100%",
  },
  text: {
    color: "#132113",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
});
