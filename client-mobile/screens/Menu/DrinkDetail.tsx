import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, TextInput } from "react-native";
import axios from "axios";

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
  const [drink, setDrink] = useState<Drink | null>(null);
  const [sugarLevel, setSugarLevel] = useState<Option | null>(null);
  const [iceLevel, setIceLevel] = useState<Option | null>(null);
  const [note, setNote] = useState("");
  React.useEffect(() => {
    fetchDrink();
  }, []);

  const fetchDrink = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.8:8000/api/product/${route.params.id}`
      ); // Thay đổi đường dẫn API tương ứng
      setDrink(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    if (drink) {
      // TODO: Add to cart
      console.log("Added to cart:", drink);
    }
  };

  return (
    <View style={styles.container}>
      {drink && (
        <>
          <Image source={{ uri: drink.image }} style={styles.image} />
          <Text style={styles.name}>{drink.name}</Text>
          <Text style={styles.price}>Price: ${drink.price}</Text>
          <Text style={styles.label}>Sugar Level:</Text>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <Button
                key={option.label}
                title={option.label}
                onPress={() => setSugarLevel(option)}
                color={option === sugarLevel ? "#0000FF" : "#888888"}
              />
            ))}
          </View>
          <Text style={styles.label}>Ice Level:</Text>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <Button
                key={option.label}
                title={option.label}
                onPress={() => setIceLevel(option)}
                color={option === iceLevel ? "#0000FF" : "#888888"}
              />
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
          <Button title="Add to Cart" onPress={addToCart} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
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
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  textInput: {
    width: "100%",
    height: 80,
    borderColor: "#888888",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
});

export default DrinkDetail;
