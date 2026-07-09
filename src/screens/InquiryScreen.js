import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { fetchInquiries } from "../lib/api";
import PrimaryButton from "../components/PrimaryButton";

export default function InquiryScreen({ onBack }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchInquiries()
      .then((data) => {
        if (active) setItems(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Failed to load inquiries.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>inquiry</Text>
      <Text style={styles.title}>Customer inquiries</Text>
      <Text style={styles.subtitle}>FAQ chatbot escalations and active ownership.</Text>

      {loading ? <ActivityIndicator color="#ffd24d" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <ScrollView contentContainerStyle={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.name}>{item.customer}</Text>
              <Text style={styles.owner}>{item.currentAgent}</Text>
            </View>
            <Text style={styles.question}>{item.question}</Text>
            {item.thread?.map((line, index) => (
              <View key={`${item.id}-${index}`} style={styles.threadLine}>
                <Text style={styles.threadRole}>{line.role}</Text>
                <Text style={styles.threadMsg}>{line.message}</Text>
              </View>
            ))}
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
    gap: 10,
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
  subtitle: {
    color: "#b2c9b7",
  },
  list: {
    gap: 12,
    paddingBottom: 12,
  },
  card: {
    backgroundColor: "rgba(4, 10, 7, 0.68)",
    borderColor: "rgba(222, 255, 227, 0.12)",
    borderWidth: 1,
    borderRadius: 24,
    padding: 14,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  name: {
    color: "#f3fff5",
    fontWeight: "800",
  },
  owner: {
    color: "#7df0a4",
  },
  question: {
    color: "#bfd0c3",
  },
  threadLine: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    padding: 10,
  },
  threadRole: {
    color: "#7df0a4",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 11,
  },
  threadMsg: {
    color: "#f3fff5",
    marginTop: 4,
  },
  error: {
    color: "#ffd8d8",
  },
});
