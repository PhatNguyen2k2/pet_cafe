import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

interface Product {
  _id: string;
  name: string;
  type: string;
  price: number;
  amount: number;
  image: string;
}

interface ProductSwiperProps {
  products: Product[];
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({ products }) => {
  const swiperRef = React.useRef<Swiper>(null);

  const renderSlides = () => {
    const slides: JSX.Element[] = [];
    for (let i = 0; i < products.length; i += 2) {
      const rowProducts = products.slice(i, i + 2);
      const slide = (
        <View key={i} style={styles.slideRow}>
          {rowProducts.map((product, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: product.image }} style={styles.image} />
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>{product.price}</Text>
            </View>
          ))}
        </View>
      );
      slides.push(slide);
    }
    return slides;
  };

  const scrollToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={true}
        showsPagination={true}
        onIndexChanged={scrollToNextSlide}
        contentContainerStyle={styles.swiperContent}
        style={styles.swiper}
      >
        {renderSlides()}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: 200,
  },
  swiper: {
    overflow: "visible",
  },
  swiperContent: {
    paddingHorizontal: 20,
  },
  slideRow: {
    flex: 1,
    flexDirection: "row",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#fff",
    width: 110,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 60,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
  },
});

export default ProductSwiper;
