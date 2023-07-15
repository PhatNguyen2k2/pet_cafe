import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/userSlice";
import * as RootNavigation from "./RootNavigation";

interface CustomHeaderProps {
  title: string;
  logoSource: string;
}
const CustomHeader: React.FC<CustomHeaderProps> = ({ title, logoSource }) => {
  const navigation = useNavigation();
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Sign In", value: "signin" },
    { label: "Sign Up", value: "signup" },
  ]);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    RootNavigation.navigate("SignIn");
  };

  const handleSignUp = () => {
    RootNavigation.navigate("SignUp");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      <View style={styles.header}>
        <Image source={{ uri: logoSource }} style={styles.logo} />
        {loggedIn ? (
          <>
            <Image source={{ uri: userInfo?.avatar }} style={styles.avatar} />
            <TouchableOpacity onPress={handleLogout}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Account"
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              labelStyle={styles.dropdownItem}
              dropDownContainerStyle={styles.dropdownMenu}
              onSelectItem={(item: any) => {
                if (item.value === "signin") {
                  handleSignIn();
                } else if (item.value === "signup") {
                  handleSignUp();
                }
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    zIndex: 1,
    height: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
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
  dropdownContainer: {
    width: 110,
    alignItems: "flex-end",
  },
  dropdown: {
    backgroundColor: "#f0f0f0",
    borderWidth: 0,
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  dropdownMenu: {
    backgroundColor: "#f0f0f0",
    borderWidth: 0,
    marginTop: -1,
  },
});

export default CustomHeader;
