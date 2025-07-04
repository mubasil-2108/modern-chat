import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }
  return <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="profile" options={{ animation:'ios_from_right'}}/>
    <Stack.Screen name="new-room" options={{ animation:'ios_from_right' }}/>
    <Stack.Screen name="[chat]" options={{ animation:'ios_from_right' }}/>
    <Stack.Screen name="settings/[chat]" options={{ animation:'ios_from_right' }}/>
  </Stack>;
}
