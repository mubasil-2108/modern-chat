import { responsiveHeight, sizes } from "@/services";
import { isClerkAPIResponseError, useSignIn, useSSO } from "@clerk/clerk-expo";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from "expo-web-browser";
import { useCallback, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Spacer, Text } from "../../components";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { startSSOFlow } = useSSO();
  const { setActive, signIn } = useSignIn();
  const [errors, setErrors] = useState([]);

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl,
        options: {
          prompt: 'consent' // forces Google to show account selector
        }
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
      } else {
        console.warn("Google sign-in: No session created");
      }

    } catch (e) {
      if (isClerkAPIResponseError(e)) {
        setErrors(e.errors);
      } else {
        console.log(e);
      }
    }
  }, [startSSOFlow, setActive]);

  const handleSignInWithPasskey = async () => {
    try {
      const signInAttempt = await signIn.authenticateWithPasskey({
        flow: "discoverable"
      })

      if (signInAttempt?.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId })
      } else {
        // there is no session
      }
    } catch (e) {
      if (isClerkAPIResponseError(e)) {
        setErrors(e.errors);
      } else {
        console.log(e);
      }
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <Spacer isHeaderHeight />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Image source={require("@/assets/images/icon.png")} style={{ height: 100, width: 100, resizeMode: "contain", tintColor: "#ffffff" }} />
          <Spacer isMedium />
          <Text style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}>
            Modren Chat App
          </Text>
          <Spacer isTiny />
          <Text variant="bodyMedium" style={{ textAlign: "center" }}>
            The best chat app in the world
          </Text>
          {
            errors.map((error) => (
              <Text key={error.code} variant="bodyMedium" style={{ textAlign: "center", color: "red" }}>
                {error.message}
              </Text>
            ))
          }
        </View>
        <Spacer isDoubleBase />
        <View style={{ alignItems: "center", }}>
          <Button left icon={'key'} onPress={handleSignInWithPasskey} appearance={'filled'} style={{ width: '90%', gap: 10, borderRadius: 15, borderColor: '#ffffff', height: sizes.buttonHeight, backgroundColor: "#ffffff", paddingVertical: 0 }} textStyle={{ fontSize: 17, color: '#18181B' }} >Continue with Passkey</Button>
          <Spacer isSmall />
          <Button appearance={'filled'} onPress={handleSignInWithGoogle} left image={require("../../assets/images/google-icon.png")} style={{ width: '90%', gap: 10, borderRadius: 15, borderColor: '#ffffff', height: sizes.buttonHeight, backgroundColor: "#ffffff", paddingVertical: 0 }} textStyle={{ fontSize: 17, color: '#18181B' }} >Continue with Google</Button>
        </View>
      </View>
      <Spacer height={responsiveHeight(5)} />

    </SafeAreaView>
  );
}
