import React from 'react';
import styled from 'styled-components/native';

const CityCard = ({data}) => {
  const weather = data.item.weather[0];
  const currentDate = new Date(data.item.dt * 1000);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dateString = currentDate.toLocaleDateString();
  const dayNumber = new Date(dateString);
  const dayName = days[dayNumber.getDay()];

  return (
    <Container key={data.dt}>
      <DayNameText>{dayName}</DayNameText>
      <DayTemperatureText>{Math.round(data.item.temp.max)}°</DayTemperatureText>

      <TemperatureCardIcon
        source={{
          uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
        }}
      />
    </Container>
  );
};

const TemperatureCardIcon = styled.Image`
  width: 120px;
  height: 180px;
  margin: 0 auto;
`;
export const DayNameText = styled.Text`
  height: 31px;
  width: 86px;
  color: #ffffff;
  font-family: Poppins;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 33px;
  text-align: center;
`;
export const DayTemperatureText = styled.Text`
  height: 51px;
  width: 51px;
  color: #ffffff;
  font-family: Poppins;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 55px;
  text-align: center;
`;
export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 40px 10px 180px 20px;

  height: 232px;
  width: 148px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
`;

export default CityCard;
