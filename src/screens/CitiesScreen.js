import React, {useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {Text, FAB} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {addcity} from '../redux/reducer';
import CityCard from '../components/CityCard';

function CitiesScreen({navigation}) {
  let cities = useSelector(state => state);
  const dispatch = useDispatch();
  const addCity = city => dispatch(addcity(city));
  const API_KEY = '799acd13e10b7a3b7cf9c0a8da6e5394';
  const citiesReducer = city => dispatch({type: 'ADD_CITY', payload: city});

  useEffect(async () => {
    console.log('cities', cities);
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
          console.log('res', data);
          citiesReducer(data);
        }
      }
      console.log('cities', cities);
    } catch (ex) {
      console.log('There has been a problem with your fetch operation: ' + ex);
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
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Add a new city"
          onPress={() =>
            navigation.navigate('AddCityScreen', {
              addCity,
            })
          }
        />
        <CityScrollView>
          {cities.length === 0 ? (
            <Container>
              <Text>Weather</Text>
            </Container>
          ) : (
            cities.map(data => {
              return (
                <TouchableOpacity onPress={() => navigateToWeatherDetail(data)}>
                  <CityCard data={data} key={data.name} />
                </TouchableOpacity>
              );
            })
          )}
        </CityScrollView>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'relative',
    margin: 20,
    right: 0,
  },
});

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

// export const ButtonLabel = styled.Text`
// color: #ffffff;
// font-size: 14px;
//font-family: Poppins;
// width: 110vw;
// height: 60px;
// `;
// const ButtonContainer = styled.TouchableHighlight`
// background-color:black;
// width: 80%;
// margin-top: 5px;
// border-color:black;
// border-width: 2px;
// `;

export default CitiesScreen;
