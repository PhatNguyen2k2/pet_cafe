import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Carousel from "../components/Carousel";
import CustomHeader from "../components/CustomHeader";
import axios from "axios";
import ProductSwiper from "../components/Swiper";

export default function HomeScreen() {
  const [drinks, setDrinks] = useState([]);
  const [pets, setPets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const fetchProducts = async () => {
    try {
      const response1 = await axios.get(
        "http://192.168.1.6:8000/api/product/drink/new"
      );
      setDrinks(response1.data);
      const response2 = await axios.get(
        "http://192.168.1.6:8000/api/product/pet/new"
      );
      setPets(response2.data);
    } catch (error) {
      setDrinks([]);
      setPets([]);
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
      <CustomHeader
        title="Home"
        logoSource="https://res.cloudinary.com/da5yv096f/image/upload/v1676201571/petcafeLogo_yz4ltv.png"
      />
      <ScrollView>
        <Carousel images={images} texts={texts} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Check out our new drinks</Text>
        {drinks.length > 0 ? (
          <ProductSwiper products={drinks} />
        ) : (
          <Text>No drink available</Text>
        )}
        <Text style={styles.text}>And also our new pets</Text>
        {pets.length > 0 ? (
          <ProductSwiper products={pets} />
        ) : (
          <Text>No pet available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    marginBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
