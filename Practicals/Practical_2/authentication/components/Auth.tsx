import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();
console.log (( redirectTo ));

const createSessionFromUrl = async (url: string) => {  
  const { params, errorCode } = QueryParams.getQueryParams(url);  
  
  if (errorCode) throw new Error(errorCode);  
  const { access_token, refresh_token } = params;  
  
  if (!access_token) return;  
  
  const { data, error } = await supabase.auth.setSession({    
    access_token,    
    refresh_token,  
  });  
  if (error) throw error;  
  console.log( "session", data.session );
  return data.session;
};

const performOAuth = async () => {  
  const { data, error } = await supabase.auth.signInWithOAuth({    
    provider: "github",    
    options: {      
      redirectTo,      
      skipBrowserRedirect: true,    
    },  
  });  
  if (error) throw error;  
  
  const res = await WebBrowser.openAuthSessionAsync(    
    data?.url ?? "",    
    redirectTo  
  );  
  
  if (res.type === "success") {    
    const { url } = res;    
    await createSessionFromUrl(url); 
  }
};

const sendMagicLink = async () => {  
  const { error } = await supabase.auth.signInWithOtp({    
    email: "02230310.cst@rub.edu.bt",    
    options: {      
      emailRedirectTo: redirectTo,    
    },  
  });  
  
  if (error) throw error;  
  // Email sent.
};


export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }
  // Handle linking into app from email app.  
  const url = Linking.useURL();
  console.log({url});  
  if (url) createSessionFromUrl(url);

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
      <View style={{flexDirection: "column", gap: 8, marginTop: 5}}>
        <Button onPress={performOAuth} title="Sign in with Github" />
        <Button onPress={sendMagicLink} title="Send Magic Link" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
