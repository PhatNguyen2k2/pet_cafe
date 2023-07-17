import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const screenWidth = Dimensions.get("window").width;

const ProductList = ({ route }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    axios
      .get(
        `http://192.168.1.8:8000/api/product/type/find?type=${route.params.typename}`
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
      <View style={styles.productContainer}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
        <View style={styles.productNameContainer}>
          <Text style={styles.productName}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item._id}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  productImageContainer: {
    width: (screenWidth - 40) / 2,
    height: (screenWidth - 40) / 2,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productNameContainer: {
    position: "absolute",
    top: (screenWidth - 40) / 4,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  productName: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});

export default ProductList;
