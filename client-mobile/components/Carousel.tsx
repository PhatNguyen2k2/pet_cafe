import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";

interface CarouselProps {
  images: string[];
  texts: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images, texts }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / width);
    setActiveIndex(currentIndex);
  };

  const { width } = Dimensions.get("window");

  useEffect(() => {
    const timer = setTimeout(() => {
      // Kiểm tra nếu đang ở slide cuối cùng thì chuyển về slide đầu tiên
      const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(newIndex);
      // Tự động cuộn tới slide tiếp theo
      scrollViewRef.current?.scrollTo({ x: newIndex * width, animated: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeIndex, images.length, width]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{texts[index]}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    width: Dimensions.get("window").width,
    height: 200,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "blue",
  },
});

export default Carousel;
