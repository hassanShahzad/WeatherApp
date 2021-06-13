import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import DayCard from '../components/DayCard';

const openWeatherKey = '799acd13e10b7a3b7cf9c0a8da6e5394';
let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;

const WeatherDetailScreen = ({navigation, route}) => {
  const cityData = route.params.data;
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadForecast = async () => {
    setRefreshing(true);

    const response = await fetch(
      `${url}&lat=${cityData.coord.lat}&lon=${cityData.coord.lon}`,
    );
    const data = await response.json();

    if (!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`);
    } else {
      console.log('forecat', data);

      setForecast(data);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    console.log('props', route);
    if (!forecast) {
      loadForecast();
    }
  });

  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" />
        <LoadingText>'Data is Loading'</LoadingText>
      </SafeAreaView>
    );
  }

  const current = forecast.current.weather[0];
  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              loadForecast();
            }}
            refreshing={refreshing}
          />
        }>
        <Header navigation={navigation} titleText={cityData.name} />
        <WeatherTypeText>{current.description}</WeatherTypeText>

        <View style={styles.current}>
          <TemperatureIcon
            source={{
              uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
            }}
          />
          <TemperatureText>
            {Math.round(forecast.current.temp)}°
          </TemperatureText>
        </View>

        <View>
          <FlatList
            horizontal
            data={forecast.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={hour => {
              const weather = hour.item.weather[0];
              var dt = new Date(hour.item.dt * 1000);
              return (
                <HourContainer>
                  <HorizontalLine />

                  <Text>{dt.toLocaleTimeString().replace(/:\d+ /, ' ')}</Text>
                  <BigOval />
                  <Text>{Math.round(hour.item.temp)}°</Text>
                </HourContainer>
              );
            }}
          />
        </View>

        <FlatList
          horizontal
          data={forecast.daily.slice(0, 5)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => {
            return <DayCard data={data} />;
          }}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 24,
    marginVertical: 12,
    marginLeft: 4,
    color: '#e96e50',
  },

  loading: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  day: {
    flexDirection: 'row',
  },
  dayDetails: {
    justifyContent: 'center',
  },
  dayTemp: {
    marginLeft: 12,
    alignSelf: 'center',
    fontSize: 20,
  },
});

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #77b9f5;
  align-items: center;
  justify-content: flex-start;
  height: auto;
`;

export const BigOval = styled.View`
  height: 25px;
  width: 25px;
  background-color: #ffffff;
  border-radius: 12px;
`;

export const SmallOval = styled.View`
  height: 15px;
  width: 25px;
  background-color: #ffffff;
  border-radius: 7.5px;
`;

export const HorizontalLine = styled.View`
  border-bottom-color: white;
  border-bottom-width: 1px;
  width: 100%;
  top: 50%;
  left: 60%;
`;

export const HourContainer = styled.View`
  padding-right: 10px;
  padding-left: 10px;
  align-items: center;
`;

export const LoadingText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 42px;
  color: white;
  font-family: Poppins;
`;
export const TemperatureText = styled.Text`
  color: white;
  font-family: Poppins;
  font-size: 110px;
  font-weight: bold;
  margin-right: 50px;
`;
export const WeatherTypeText = styled.Text`
  color: white;
  font-size: 26px;
  font-family: Poppins;
  font-weight: bold;
  margin: 0 auto;
`;
export const DateText = styled.Text`
  color: white;
  font-size: 18px;
  font-family: Poppins;
`;
export const TimeText = styled.Text`
  color: white;
  font-size: 12px;
  font-family: Poppins;
`;
const TemperatureIcon = styled.Image`
  width: 184px;
  height: 184px;
  margin: 0 auto;
`;

export default WeatherDetailScreen;
