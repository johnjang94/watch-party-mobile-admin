import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { fetchUsers } from "../lib/api";
import PrimaryButton from "../components/PrimaryButton";

export default function UserListScreen({ section, onBack }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetchUsers(section === "new" ? 1 : undefined)
      .then((items) => {
        if (active) setUsers(items);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Failed to load users.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [section]);

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{section}</Text>
        <Text style={styles.title}>{section === "new" ? "Past 24 hours" : "Full history"}</Text>
      </View>

      {loading ? <ActivityIndicator color="#ffd24d" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <ScrollView contentContainerStyle={styles.list}>
        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <Image source={require("../../assets/image.png")} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
              <Text style={styles.meta}>{user.phoneNumber}</Text>
              <Text style={styles.meta}>{user.attendance ?? "Attending"}</Text>
              <Text style={styles.meta}>Entered: {user.enteredAt ?? user.createdAt}</Text>
              <Text style={styles.meta}>Registered: {user.registeredAt ?? user.createdAt}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <PrimaryButton label="Back to dashboard" onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  header: {
    gap: 6,
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
    fontSize: 30,
    fontWeight: "900",
  },
  list: {
    gap: 12,
    paddingBottom: 12,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "rgba(4, 10, 7, 0.68)",
    borderColor: "rgba(222, 255, 227, 0.12)",
    borderWidth: 1,
    borderRadius: 24,
    padding: 14,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 18,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: "#f3fff5",
    fontSize: 18,
    fontWeight: "800",
  },
  meta: {
    color: "#b2c9b7",
  },
  error: {
    color: "#ffd8d8",
  },
});
