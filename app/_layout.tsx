import { tokenCache } from "@/services/utilities/cache/cache";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { passkeys } from "@clerk/expo-passkeys";
import * as eva from '@eva-design/eva';
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error("PUBLISHABLE_KEY is not set");
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
      __experimental_passkeys={passkeys}
    >
      <ClerkLoaded>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <ThemeProvider value={DarkTheme}>
            <StatusBar backgroundColor="#18181B" />
            <SafeAreaProvider style={{flex:1}}>
            <Slot />
            </SafeAreaProvider>
          </ThemeProvider>
        </ApplicationProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
