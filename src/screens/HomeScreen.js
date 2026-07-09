import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import heroImage from "../../watch-party-admin/image.png";
import { authenticateAdmin } from "../lib/api";
import PrimaryButton from "../components/PrimaryButton";

export default function HomeScreen({ onAuthenticated }) {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    setIsSubmitting(true);
    setError("");
    try {
      const session = await authenticateAdmin(firstName.trim(), phoneNumber.trim());
      onAuthenticated?.(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ImageBackground source={heroImage} resizeMode="cover" style={styles.hero}>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>control room</Text>
        <Text style={styles.title}>Watch Party Admin</Text>
        <Text style={styles.description}>Use your name and phone number to unlock the admin dashboard.</Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Your name"
              placeholderTextColor="#7e9181"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Your phone number"
              placeholderTextColor="#7e9181"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          <PrimaryButton label={isSubmitting ? "Authenticating..." : "Admin Login"} onPress={handleLogin} wide />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 8, 7, 0.58)",
  },
  content: {
    padding: 20,
    gap: 12,
  },
  eyebrow: {
    color: "#7df0a4",
    textTransform: "uppercase",
    letterSpacing: 4,
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    color: "#f3fff5",
    fontSize: 44,
    lineHeight: 42,
    letterSpacing: -1.8,
    fontWeight: "900",
  },
  description: {
    color: "#bfd0c3",
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 340,
  },
  form: {
    backgroundColor: "rgba(4, 10, 7, 0.68)",
    borderColor: "rgba(222, 255, 227, 0.12)",
    borderWidth: 1,
    borderRadius: 28,
    padding: 18,
    gap: 12,
  },
  field: {
    gap: 8,
  },
  label: {
    color: "#b2c9b7",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#f3fff5",
  },
  error: {
    color: "#ffd8d8",
    backgroundColor: "rgba(255,123,123,0.12)",
    borderColor: "rgba(255,123,123,0.25)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
});
