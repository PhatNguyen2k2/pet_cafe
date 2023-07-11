import React from "react";
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";

interface CustomHeaderProps {
  title: string;
  logoSource: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, logoSource }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Image source={{ uri: logoSource }} style={styles.logo} />
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
});

export default CustomHeader;
