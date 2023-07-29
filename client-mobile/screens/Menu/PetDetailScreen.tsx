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
import CustomHeader from "../../components/CustomHeader";

interface Pet {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface PetDetailProps {
  route: any;
}
const PetDetail: React.FC<PetDetailProps> = ({ route }) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [quantity, setQuantity] = useState(1);
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
    fetchPet();
  }, []);

  const fetchPet = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.16:8000/api/product/${route.params.id}`
      );
      setPet(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    if (pet) {
      // TODO: Add to cart
      console.log("Added to cart:", pet);
    }
  };

  return (
    <>
      <CustomHeader
        title="PetsMenu"
        logoSource="https://res.cloudinary.com/da5yv096f/image/upload/v1676201571/petcafeLogo_yz4ltv.png"
      />
      <ScrollView>
        <View style={styles.container}>
          {pet && (
            <>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: pet.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={styles.price}>{pet.price} VND</Text>
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
                * Log in before add something to your card.{"\n"}
                We will contact you via email when you buy our pet
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

export default PetDetail;
