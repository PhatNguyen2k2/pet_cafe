import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import CustomHeader from "../../components/CustomHeader";
import * as RootNavigation from "../../components/RootNavigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const ProductList = ({ route }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const handleProductPress = (id: string) => {
    route.params.typename === "cat" || route.params.typename === "dog"
      ? RootNavigation.navigate("PetDetail", { id })
      : RootNavigation.navigate("DrinkDetail", { id });
  };
  useEffect(() => {
    axios
      .get(
        `http://192.168.1.16:8000/api/product/type/find?type=${route.params.typename}`
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const renderProduct = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity onPress={() => handleProductPress(item._id)}>
        <View style={styles.itemContainer}>
          <View style={styles.shadowContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Price: {item.price} VND</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CustomHeader
        title="ProductMenu"
        logoSource="https://res.cloudinary.com/da5yv096f/image/upload/v1676201571/petcafeLogo_yz4ltv.png"
      />
      <SafeAreaView style={styles.container}>
        {route.params.typename === "cat" || route.params.typename === "dog" ? (
          <Animatable.Text
            animation="flipInX"
            iterationCount="infinite"
            direction="alternate"
            style={styles.title}
          >
            Now choose your pet
          </Animatable.Text>
        ) : (
          <Animatable.Text
            animation="flipInX"
            iterationCount="infinite"
            direction="alternate"
            style={styles.title}
          >
            Now choose your drink
          </Animatable.Text>
        )}
        <Text style={styles.textMuted}>
          * Log in before add something to your card
        </Text>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatlistContainer}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  shadowContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
  },
  textMuted: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 5,
  },
});

export default ProductList;
