import React from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
} from "react-native";
import Carousel from "../components/Carousel";
import CustomHeader from "../components/CustomHeader";
export default function HomeScreen() {
  const images = [
    "https://res.cloudinary.com/da5yv096f/image/upload/v1675221244/white-cat-4424507_960_720_fsszho.jpg",
    "https://res.cloudinary.com/da5yv096f/image/upload/v1675221162/animals-3714805_960_720_mjvkaa.jpg",
    "https://res.cloudinary.com/da5yv096f/image/upload/v1675242771/shiba-inu-7226742_960_720_raob33.jpg",
    "https://res.cloudinary.com/da5yv096f/image/upload/v1675221427/corgi-6705821_960_720_xqkcd0.jpg",
    "https://res.cloudinary.com/da5yv096f/image/upload/v1675221496/coffee-2179028_960_720_oshp8c.jpg",
  ];

  const texts = [
    "A cute white cat",
    "A British shorthair cat",
    "A shiba inu",
    "A corgi",
    "A coffee",
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomHeader
          title="Home"
          logoSource="https://res.cloudinary.com/da5yv096f/image/upload/v1676201571/petcafeLogo_yz4ltv.png"
        />
        <Carousel images={images} texts={texts} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
