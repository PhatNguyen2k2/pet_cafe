import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import DrinkMenu from "./screens/Menu/DrinkMenuScreen";
import PetMenuScreen from "./screens/Menu/PetMenuScreen";
import SignIn from "./screens/Auth/SignInScreen";
import SignUp from "./screens/Auth/SignUpScreen";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./components/RootNavigation";
import ProductList from "./screens/Menu/MenuDetailScreen";
import DrinkDetail from "./screens/Menu/DrinkDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
function DrinksStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrinksType" component={DrinkMenu} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="DrinkDetail" component={DrinkDetail} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "home";

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Drinks") {
                iconName = focused ? "cafe" : "cafe-outline";
              } else if (route.name === "Pets") {
                iconName = focused ? "paw" : "paw-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "violet",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Drinks" component={DrinksStack} />
          <Tab.Screen name="Pets" component={PetMenuScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
