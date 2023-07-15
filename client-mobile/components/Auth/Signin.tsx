import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import * as RootNavigation from "../RootNavigation";

const SignIn = () => {
  const navigation = useNavigation();
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
      const response = await fetch("http://localhost:8000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.status === 401) {
        Alert.alert("Lỗi", "Sai mật khẩu hoặc email");
      } else {
        localStorage.setItem("token", data.token);
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
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
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
          Chúng tôi sẽ không công khai email của bạn
        </Text>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Mật khẩu</Text>
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
          <Text style={styles.checkboxLabel}>Hiển thị</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => navigation.navigate("/signup")}
        activeOpacity={0.8}
      >
        <Text style={styles.link}>Chưa có tài khoản?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
