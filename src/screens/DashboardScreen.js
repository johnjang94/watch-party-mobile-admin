import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PageCard from "../components/PageCard";
import PrimaryButton from "../components/PrimaryButton";

export default function DashboardScreen({ session, onOpenUsers, onGoHome }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>dashboard</Text>
        <Text style={styles.title}>Admin actions</Text>
        <Text style={styles.subtitle}>
          {session ? `${session.firstName} · ${session.phoneNumber}` : "Connected admin session"}
        </Text>
      </View>

      <View style={styles.grid}>
        <PageCard title="new" subtitle="Past 24 hours only">
          <PrimaryButton label="Open new" onPress={() => onOpenUsers("new")} wide />
        </PageCard>

        <View style={styles.row}>
          <View style={styles.half}>
            <PageCard title="all" subtitle="Full registration history">
              <PrimaryButton label="Open all" onPress={() => onOpenUsers("all")} wide />
            </PageCard>
          </View>
          <View style={styles.half}>
            <PageCard title="inquiry" subtitle="Chatbot escalations">
              <PrimaryButton label="Open inquiry" onPress={() => onOpenUsers("inquiry")} wide />
            </PageCard>
          </View>
        </View>
      </View>

      <PrimaryButton label="Sign out" onPress={onGoHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  header: {
    gap: 8,
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
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1.2,
  },
  subtitle: {
    color: "#b2c9b7",
  },
  grid: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  half: {
    flex: 1,
  },
});
