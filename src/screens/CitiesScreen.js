import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import CityCard from '../components/CityCard';
import AddCityButton from '../components/AddCityButton';

function CitiesScreen({navigation}) {
  let cities = useSelector(state => state);
  const dispatch = useDispatch();
  const API_KEY = '799acd13e10b7a3b7cf9c0a8da6e5394';
  const citiesReducer = city => dispatch({type: 'ADD_CITY', payload: city});

  useEffect(async () => {
    if (cities.length === 0) {
      await getWeatherOfCities();
    }
  });

  const navigateToWeatherDetail = data => {
    navigation.navigate('WeatherDetailScreen', {
      data: data,
    });
  };

  const getWeatherOfCity = async city => {
    try {
      const result = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      );

      if (result.status === 200) {
        const data = await result.json();
        if (data) {
          citiesReducer(data);
        }
      } else {
        Alert.alert('Error', 'Something went wrong while adding city', [
          {text: 'OK'},
        ]);
      }
    } catch (ex) {
      Alert.alert('Error', 'Something went wrong while adding city', [
        {text: 'OK'},
      ]);
    }
  };

  const getWeatherOfCities = () => {
    const myCities = ['Milan', 'Florence', 'Rome'];
    myCities.map(city => {
      getWeatherOfCity(city);
    });
  };
  return (
    <>
      <Container>
        <WelcomeText>Good morning! Mario</WelcomeText>
        <CardContainer onPress={() => navigation.navigate('AddCityScreen')}>
          <AddCityButton />
        </CardContainer>

        <CityScrollView>
          {cities.length === 0 ? (
            <Container></Container>
          ) : (
            cities.map((data, index) => {
              return index == cities.length - 1 ? (
                <LastCardContainer
                  onPress={() => navigateToWeatherDetail(data)}>
                  <CityCard data={data} key={index} />
                </LastCardContainer>
              ) : (
                <CardContainer onPress={() => navigateToWeatherDetail(data)}>
                  <CityCard data={data} key={data.name} />
                </CardContainer>
              );
            })
          )}
        </CityScrollView>
      </Container>
    </>
  );
}

export const Container = styled.View`
  flex: 1;
  background-color: #d3d3d3;
  align-items: center;
  justify-content: center;
`;

export const CityScrollView = styled.ScrollView`
  flex: 1;
  contentcontainerstyle : {
    align-items: center;
    justify-content: center;
  }
`;
export const CardContainer = styled.TouchableOpacity``;
export const LastCardContainer = styled.TouchableOpacity`
  margin-bottom: 200px;
`;
export const WelcomeText = styled.Text`
  height: 78px;
  width: 215px;
  color: #01175f;
  font-family: Poppins;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 42px;
  text-align: center;
  margin-top: 50px;
`;

export default CitiesScreen;
