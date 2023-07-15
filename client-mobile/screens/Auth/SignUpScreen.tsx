import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axios from "axios";
import * as RootNavigation from "../../components/RootNavigation";

const SignUp = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handleSubmit = async () => {
    const form = {
      fullname: fullName,
      email: email,
      address: address,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://192.168.1.6:8000/api/user/signup",
        form
      );
      // Handle successful response here
    } catch (error) {
      // Handle error here
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://cdn.pixabay.com/photo/2016/06/24/15/48/pattern-1477380_960_720.png",
      }}
      resizeMode="cover"
      style={styles.image}
      blurRadius={2}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SIGN UP</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Surname</Text>
          <TextInput
            style={styles.input}
            placeholder="Nguyen Van"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="A"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@gmail.com"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Text style={styles.description}>
            We will never share your email with anyone else
          </Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline={true}
            numberOfLines={3}
            placeholder="Thu Duc city"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={!passwordShow}
            placeholder="12345678"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity onPress={togglePassword} style={styles.checkbox}>
            <Text style={styles.checkboxLabel}>Show password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => RootNavigation.navigate("SignIn")}
        >
          <Text style={styles.linkText}>Have an account?</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
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
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  description: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
    color: "blue",
    marginBottom: 16,
  },
});

export default SignUp;
