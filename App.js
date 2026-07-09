import React, { useMemo, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import UserListScreen from "./src/screens/UserListScreen";
import InquiryScreen from "./src/screens/InquiryScreen";

export default function App() {
  const [route, setRoute] = useState("home");
  const [authSession, setAuthSession] = useState(null);
  const [dashboardSection, setDashboardSection] = useState("dashboard");

  const Screen = useMemo(() => {
    switch (route) {
      case "dashboard":
        return (
          <DashboardScreen
            onGoHome={() => setRoute("home")}
            onOpenUsers={(section) => {
              setDashboardSection(section);
              setRoute(section);
            }}
            session={authSession}
          />
        );
      case "new":
      case "all":
        return (
          <UserListScreen
            section={dashboardSection}
            onBack={() => setRoute("dashboard")}
          />
        );
      case "inquiry":
        return <InquiryScreen onBack={() => setRoute("dashboard")} />;
      default:
        return (
          <HomeScreen
            onAuthenticated={(session) => {
              setAuthSession(session);
              setRoute("dashboard");
            }}
          />
        );
    }
  }, [authSession, dashboardSection, route]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.flex}>{Screen}</View>
    </SafeAreaView>
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
