import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";

export default function Auth() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendOtp() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function verifyOtp() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      phone,
      token: password,
      type: "sms",
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Phone"
          leftIcon={{ type: "font-awesome", name: "phone" }}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          placeholder="+975********"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="OTP"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="OTP"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Send OTP"
          disabled={loading}
          onPress={() => sendOtp()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="VerifyOTP"
          disabled={loading}
          onPress={() => verifyOtp()}
        />
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
