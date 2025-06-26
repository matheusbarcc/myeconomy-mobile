import { Center, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { StatusBar } from "react-native";
import { config } from "./config/gluestack-ui.config";
import { Home } from "@/screens/Home";
import { Routes } from "@/routes";
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
