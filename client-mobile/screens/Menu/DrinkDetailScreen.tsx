import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import CustomHeader from "../../components/CustomHeader";

interface Drink {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface DrinkDetailProps {
  route: any;
}
interface Option {
  label: string;
  value: number;
}

const options: Option[] = [
  { label: "0%", value: 0 },
  { label: "50%", value: 50 },
  { label: "100%", value: 100 },
];
const DrinkDetail: React.FC<DrinkDetailProps> = ({ route }) => {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const [drink, setDrink] = useState<Drink | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sugarLevel, setSugarLevel] = useState<Option | null>(null);
  const [iceLevel, setIceLevel] = useState<Option | null>(null);
  const [note, setNote] = useState("");
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  React.useEffect(() => {
    fetchDrink();
  }, []);

  const fetchDrink = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.16:8000/api/product/${route.params.id}`
      );
      setDrink(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (loggedIn) {
      try {
        await axios.post(
          "http://192.168.1.16:8000/api/user/addBasket/" + route.params.id,
          { num: quantity },
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Toast.show({
          type: "success",
          text1: "Added successfully. Check your cart",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Can not connect to server, please log in and try again",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Please login to add to cart",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  return (
    <>
      <CustomHeader
        title="DrinksMenu"
        logoSource="https://res.cloudinary.com/da5yv096f/image/upload/v1676201571/petcafeLogo_yz4ltv.png"
      />
      <ScrollView>
        <View style={styles.container}>
          {drink && (
            <>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: drink.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.name}>{drink.name}</Text>
              <Text style={styles.price}>{drink.price} VND</Text>
              <View style={styles.quantityContainer}>
                <Text style={styles.labelQuantity}>Quantity:</Text>
                <View style={styles.quantityWrapper}>
                  <TouchableOpacity
                    onPress={decreaseQuantity}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={increaseQuantity}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.label}>Sugar Level:</Text>
              <View style={styles.optionsContainer}>
                {options.map((option) => (
                  <View key={option.label} style={styles.buttonContainer}>
                    <Button
                      title={option.label}
                      onPress={() => setSugarLevel(option)}
                      color={option === sugarLevel ? "#0000FF" : "#888888"}
                    />
                  </View>
                ))}
              </View>
              <Text style={styles.label}>Ice Level:</Text>
              <View style={styles.optionsContainer}>
                {options.map((option) => (
                  <View key={option.label} style={styles.buttonContainer}>
                    <Button
                      title={option.label}
                      onPress={() => setIceLevel(option)}
                      color={option === iceLevel ? "#0000FF" : "#888888"}
                    />
                  </View>
                ))}
              </View>
              <Text style={styles.label}>Note:</Text>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={3}
                placeholder="Enter your note"
                value={note}
                onChangeText={setNote}
              />
              <Text style={styles.textMuted}>
                * Log in before add something to your card
              </Text>
              <Button title="Add to Cart" onPress={addToCart} />
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 3.84,
    elevation: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  labelQuantity: {
    fontSize: 20,
    fontWeight: "bold",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  textInput: {
    width: "100%",
    height: 60,
    borderColor: "#888888",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  textMuted: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 5,
  },
});

export default DrinkDetail;
