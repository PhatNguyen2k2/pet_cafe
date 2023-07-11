import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import DrinkMenuScreen from './screens/DrinkMenuScreen';
import PetMenuScreen from './screens/PetMenuScreen';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'home';

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Drinks') {
              iconName = focused ? 'cafe' : 'cafe-outline';
            } else if (route.name === 'Pets') {
              iconName = focused ? 'paw' : 'paw-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'violet',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name='Drinks' component={DrinkMenuScreen} />
        <Tab.Screen name='Pets' component={PetMenuScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

