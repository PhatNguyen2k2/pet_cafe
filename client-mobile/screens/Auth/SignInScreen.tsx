import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { Alert } from "react-native";
import * as RootNavigation from "../../components/RootNavigation";

const SignIn = () => {
  const dispatch = useDispatch();
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };
  const handleSubmit = async () => {
    const form = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://192.168.1.6:8000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.status === 401) {
        Alert.alert("Error", "Please check your password or email");
      } else {
        dispatch(login(data)); // Sử dụng action login từ userSlice
        RootNavigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={{
        uri: "https://cdn.pixabay.com/photo/2016/06/24/15/48/pattern-1477380_960_720.png",
      }}
      resizeMode="cover"
      style={styles.image}
      blurRadius={2}
    >
      <View style={styles.container}>
        <Text style={styles.title}>SIGN IN</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            placeholder="email@gmail.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text style={styles.textMuted}>
            We will never share your email with anyone else
          </Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            placeholder="12345678"
            secureTextEntry={!passwordShow}
          />
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={togglePassword}
            activeOpacity={0.8}
          >
            <Text style={styles.checkboxLabel}>Show password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => RootNavigation.navigate("SignUp")}
          activeOpacity={0.8}
        >
          <Text style={styles.link}>Do not have an account?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    margin: 16,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textMuted: {
    fontSize: 12,
    color: "#999",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignIn;
