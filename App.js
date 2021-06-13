import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import store from './src/redux/store'
import BottomTabNavigator from './src/navigation/BottomTabNavigator'


export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
      <NavigationContainer>
          <BottomTabNavigator />
          </NavigationContainer>

      </PaperProvider>
    </StoreProvider>
  )
}
