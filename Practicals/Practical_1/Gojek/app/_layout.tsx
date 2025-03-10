import { Stack } from "expo-router";
import { Image } from "react-native";
import { Text } from "react-native"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <Image
              source={require("../assets/images/gojektop.png")} 
              style={{ width: 100, height: 40, resizeMode: "contain" }}
            />
          ),
        }}
      />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Signup" }} />
    </Stack>
  );
}