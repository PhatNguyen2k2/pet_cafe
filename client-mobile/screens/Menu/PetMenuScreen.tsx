import React, { useEffect, useRef } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import CustomHeader from "../../components/CustomHeader";
import * as RootNavigation from "../../components/RootNavigation";
interface Product {
  id: string;
  name: string;
  image: string;
}

const screenWidth = Dimensions.get("window").width;

const handleProductPress = (typename: string) => {
  RootNavigation.navigate("ProductList", { typename });
};
const renderProduct = ({ item }: { item: Product }) => {
  return (
    <TouchableOpacity onPress={() => handleProductPress(item.id)}>
      <View style={styles.productContainer}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
        <View style={styles.productNameContainer}>
          <Text style={styles.productName}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PetMenu = () => {
  const arrowRef = useRef<any>(null);
  const products: Product[] = [
    {
      id: "cat",
      name: "CAT",
      image:
        "https://cdn.pixabay.com/photo/2021/11/21/22/08/british-shorthair-6815375_960_720.jpg",
    },
    {
      id: "dog",
      name: "DOG",
      image:
        "https://cdn.pixabay.com/photo/2016/01/19/01/32/shiba-inu-1147811_960_720.jpg",
    },
  ];
  useEffect(() => {
    const animateArrow = () => {
      arrowRef.current?.slideInDown(1000).then(() => {
        setTimeout(animateArrow, 1500);
      });
    };

    setTimeout(animateArrow, 1000);
  }, []);
  return (
    <>
      <CustomHeader
        title="PetsType"
        logoSource="https://res.cloudinary.com/da5yv096f/image/upload/v1676201571/petcafeLogo_yz4ltv.png"
      />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Pick your favourite</Text>
          <Animatable.View ref={arrowRef} style={styles.arrowContainer}>
            <Icon name="angle-down" size={40} color="#000" />
          </Animatable.View>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
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

export default PetMenu;
