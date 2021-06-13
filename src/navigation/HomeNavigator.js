import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CitiesScreen from '../screens/CitiesScreen';
import AddCityScreen from '../screens/AddCityScreen';
import WeatherDetailScreen from '../screens/WeatherDetailScreen';

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CitiesScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CitiesScreen" component={CitiesScreen} />
      <Stack.Screen name="AddCityScreen" component={AddCityScreen} />
      <Stack.Screen
        name="WeatherDetailScreen"
        component={WeatherDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
