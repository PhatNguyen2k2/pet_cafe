import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Carousel from "../components/Carousel";
import CustomHeader from "../components/CustomHeader";
import axios from "axios";
import ProductSwiper from "../components/Swiper";
import * as RootNavigation from "../components/RootNavigation";

interface Product {
  _id: string;
  name: string;
  type: string;
  price: number;
  amount: number;
  image: string;
}
export default function HomeScreen() {
  const [drinks, setDrinks] = useState<Product[]>([]);
  const [pets, setPets] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [showClearButton, setShowClearButton] = useState<boolean>(false);
  const [filteredDrinks, setFilteredDrinks] = useState<Product[]>([]);
  const [filteredPets, setFilteredPets] = useState<Product[]>([]);
  const handleProductPress = (id: string) => {
    RootNavigation.navigate("DrinkDetail", { id });
  };
  const fetchProducts = async () => {
    try {
      const response1 = await axios.get(
        "http://192.168.1.16:8000/api/product/drink/new"
      );
      setDrinks(response1.data);
      const response2 = await axios.get(
        "http://192.168.1.16:8000/api/product/pet/new"
      );
      setPets(response2.data);
    } catch (error) {
      setDrinks([]);
      setPets([]);
    }
  };
  const filterProducts = () => {
    const filteredDrinks = drinks.filter((drink) =>
      drink.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredPets = pets.filter((pet) =>
      pet.name.toLowerCase().includes(searchText.toLowerCase())
    );
    searchText.length === 0
      ? setFilteredDrinks([])
      : setFilteredDrinks(filteredDrinks);
    searchText.length === 0
      ? setFilteredPets([])
      : setFilteredPets(filteredPets);
  };
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    setShowClearButton(text.length > 0);
  };
  const handleClearSearchText = () => {
    setSearchText("");
    setShowClearButton(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    filterProducts();
  }, [searchText]);
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
    <>
      <CustomHeader
        title="Home"
        logoSource="https://res.cloudinary.com/da5yv096f/image/upload/v1676201571/petcafeLogo_yz4ltv.png"
      />
      <SafeAreaView style={styles.container}>
        <ScrollView nestedScrollEnabled={true}>
          <Carousel images={images} texts={texts} />
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
            {showClearButton && (
              <TouchableOpacity
                onPress={handleClearSearchText}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>X</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.resultsContainer}>
            <ScrollView nestedScrollEnabled={true}>
              {filteredDrinks.map((drink) => (
                <TouchableOpacity
                  key={drink._id}
                  style={styles.productContainer}
                  onPress={() => handleProductPress(drink._id)}
                >
                  <Image
                    source={{ uri: drink.image }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{drink.name}</Text>
                </TouchableOpacity>
              ))}
              {filteredPets.map((pet) => (
                <TouchableOpacity
                  key={pet._id}
                  style={styles.productContainer}
                  onPress={() => handleProductPress(pet._id)}
                >
                  <Image
                    source={{ uri: pet.image }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>{pet.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
    </>
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
  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: {
    flex: 1,
    maxHeight: 170,
    marginHorizontal: 10,
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
