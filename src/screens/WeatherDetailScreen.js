import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import DayCard from '../components/DayCard';
import HourItem from '../components/HourItem';
import {getForecast} from '../shared/NetworkService';

const WeatherDetailScreen = ({navigation, route}) => {
  const cityData = route.params.data;
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const showDate = data => {
    const dateAndTimeInSeconds = data.sys.sunrise;
    const presentDate = new Date(dateAndTimeInSeconds * 1000);
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dateString = presentDate.toLocaleDateString();
    const dayNumber = new Date(dateString);
    const dayName = days[dayNumber.getDay()];
    const onlyDay = presentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
    });
    const onlyMonth = presentDate.toLocaleDateString('en-GB', {
      month: 'long',
    });
    const fullDate = `${dayName} ${onlyDay}, ${onlyMonth}`;
    setCurrentDate(fullDate);
  };

  useEffect(() => {
    showDate(cityData);
    if (!forecast) {
      const latitude = cityData.coord.lat;
      const longitude = cityData.coord.lon;
      setRefreshing(true);
      getForecast(latitude, longitude).then(data => {
        setForecast(data);
        setRefreshing(false);
      });
    }
  });

  if (!forecast) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" />
        <LoadingText>'Data is Loading'</LoadingText>
      </LoadingContainer>
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
        <DateText>{currentDate}</DateText>
        <WeatherTypeText>{current.description}</WeatherTypeText>
        <CurrentTemperatureContainer>
          <TemperatureIcon
            source={{
              uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
            }}
          />
          <TemperatureText>
            {Math.round(forecast.current.temp)}°
          </TemperatureText>
        </CurrentTemperatureContainer>

        <View>
          <FlatList
            horizontal
            data={forecast.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={hour => {
              return <HourItem hour={hour} />;
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

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #77b9f5;
  align-items: center;
  justify-content: flex-start;
  height: auto;
`;
export const LoadingContainer = styled.SafeAreaView`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;
export const CurrentTemperatureContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 42px;
  color: white;
`;
export const TemperatureText = styled.Text`
  color: white;
  font-size: 110px;
  font-weight: bold;
  margin-right: 50px;
`;
export const WeatherTypeText = styled.Text`
  color: white;
  font-size: 26px;
  font-weight: bold;
  margin: 0 auto;
`;

const TemperatureIcon = styled.Image`
  width: 184px;
  height: 184px;
  margin: 0 auto;
`;
export const DateText = styled.Text`
  height: 28px;
  width: 285px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 28px;
  text-align: center;
  margin: 0 auto;
`;

export default WeatherDetailScreen;
