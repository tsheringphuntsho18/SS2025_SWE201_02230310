import { Text, View, StyleSheet, Linking } from "react-native";
import { Link } from "expo-router";

function handleLinkPress(url: string) {
  Linking.openURL(url);
}

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/login" style={styles.loginbtn}>
        Log in
      </Link>
      <Link href="/signup" style={styles.signupbtn}>
        I'm new, sign me up
      </Link>
      <Text style={styles.text}>
        By logging in or registering, you agree to our
        <Text
          style={styles.link}
          onPress={() =>
            handleLinkPress(
              "https://www.gojek.com/en-id/terms-and-condition/gojek"
            )
          }
        >
          Terms of Service
        </Text>
        {" and "}
        <Text
          style={styles.link}
          onPress={() =>
            handleLinkPress(
              "https://www.gojek.com/en-id/terms-and-condition/privacy-policies"
            )
          }
        >
          Privacy Policy
        </Text>
        .
      </Text>{" "}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 400,
  },
  text: {
    color: "#000000",
    fontSize: 15,
  },
  loginbtn: {
    fontSize: 20,
    color: "#fff",
    backgroundColor: "#00AA13",
    padding: 15,
    borderRadius: 30,
    width: 300,
    textAlign: "center",
    marginBottom: 15,
  },
  signupbtn: {
    fontSize: 20,
    color: "#00AA13",
    borderWidth: 1,
    borderColor: "#00AA13",
    padding: 15,
    borderRadius: 30,
    width: 300,
    textAlign: "center",
    marginBottom: 15,
  },
  link: {
    color: "#00AA13",
  },
});
