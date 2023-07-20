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

const DrinkMenu = () => {
  const arrowRef = useRef<any>(null);
  const products: Product[] = [
    {
      id: "coffee",
      name: "COFFEE",
      image:
        "https://product.hstatic.net/1000373334/product/ca_phe_den_d91a43d8acef4f529c51c7481df3cb12_1024x1024.jpg",
    },
    {
      id: "tea",
      name: "MILK TEA",
      image:
        "https://bizweb.dktcdn.net/100/004/714/files/cach-pha-tra-sua-o-long-thom-ngon-don-gian-3.jpg?v=1524284884907",
    },
    {
      id: "beverage",
      name: "BEVERAGE",
      image:
        "https://product.hstatic.net/200000356473/product/cocacola-chai-390ml_7214ffae946e4e63826e8f38a45ed5fa_grande.jpg",
    },
  ];
  useEffect(() => {
    const animateArrow = () => {
      arrowRef.current?.slideInDown(1000).then(() => {
        setTimeout(animateArrow, 1500);
      });
    };

    setTimeout(animateArrow, 1500);
  }, []);
  return (
    <>
      <CustomHeader
        title="DrinksType"
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
    marginTop: -20,
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

export default DrinkMenu;
