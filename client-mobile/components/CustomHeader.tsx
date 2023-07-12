import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/userSlice";

interface CustomHeaderProps {
  title: string;
  logoSource: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, logoSource }) => {
  const navigation = useNavigation();
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    // navigation.navigate("SignIn");
  };

  const handleSignUp = () => {
    // navigation.navigate("SignUp");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Image source={{ uri: logoSource }} style={styles.logo} />
        {loggedIn ? (
          <>
            <TouchableOpacity onPress={handleLogout}>
              <Text>Log Out</Text>
            </TouchableOpacity>
            <Image source={{ uri: userInfo?.avatar }} style={styles.avatar} />
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleSignIn}>
              <Text>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default CustomHeader;
