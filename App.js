import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import UserListScreen from "./src/screens/UserListScreen";
import InquiryScreen from "./src/screens/InquiryScreen";

export default function App() {
  const [route, setRoute] = useState("home");
  const [authSession, setAuthSession] = useState(null);
  const [dashboardSection, setDashboardSection] = useState("dashboard");

  let screen = (
    <HomeScreen
      onAuthenticated={(session) => {
        setAuthSession(session);
        setRoute("dashboard");
      }}
    />
  );

  if (route === "dashboard") {
    screen = (
      <DashboardScreen
        onGoHome={() => setRoute("home")}
        onOpenUsers={(section) => {
          setDashboardSection(section);
          setRoute(section);
        }}
        session={authSession}
      />
    );
  } else if (route === "new" || route === "all") {
    screen = (
      <UserListScreen section={dashboardSection} onBack={() => setRoute("dashboard")} />
    );
  } else if (route === "inquiry") {
    screen = <InquiryScreen onBack={() => setRoute("dashboard")} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.flex}>{screen}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#06120d",
  },
  flex: {
    flex: 1,
  },
});
