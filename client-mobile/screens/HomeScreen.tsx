import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
} from "react-native";
import Carousel from "../components/Carousel";
import CustomHeader from "../components/CustomHeader";
import axios from "axios";
import ProductSwiper from "../components/Swiper";

export default function HomeScreen() {
  const [drinks, setDrinks] = useState([]);
  const [pets, setPets] = useState([]);

  const fetchProducts = async () => {
    try {
      const response1 = await axios.get(
        "http://192.168.1.11:8000/api/product/drink/new"
      );
      setDrinks(response1.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setDrinks([]); // Thiết lập products thành một mảng rỗng nếu có lỗi
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        <Text style={styles.text}>Check out our new drinks</Text>
        {drinks.length > 0 ? (
          <ProductSwiper products={drinks} />
        ) : (
          <Text>No products available</Text>
        )}
        <Text style={styles.text}>And also our new pets</Text>
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
