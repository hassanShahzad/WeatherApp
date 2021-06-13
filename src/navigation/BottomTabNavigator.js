import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import styled from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Container>
              <Image
                source={require('../../assets/icons/Home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#01175F' : 'grey',
                }}
              />
              <View
                style={{
                  borderBottomColor: focused ? '#01175F' : 'white',
                  borderBottomWidth: 1,
                  width: 100,
                  marginTop: 20,
                }}
              />
            </Container>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Container>
              <Image
                source={require('../../assets/icons/Search.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#01175F' : 'grey',
                }}
              />
              <View
                style={{
                  borderBottomColor: focused ? '#01175F' : 'white',
                  borderBottomWidth: 1,
                  width: 100,
                  marginTop: 20,
                }}
              />
            </Container>
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Container>
              <Image
                source={require('../../assets/icons/Location.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#01175F' : 'grey',
                }}
              />
              <View
                style={{
                  borderBottomColor: focused ? '#01175F' : 'white',
                  borderBottomWidth: 1,
                  width: 100,
                  marginTop: 20,
                }}
              />
            </Container>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export default BottomTabNavigator;
