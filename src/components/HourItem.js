import React from 'react';
import styled from 'styled-components/native';

const HourItem = ({hour}) => {
  const weather = hour.item.weather[0];
  const dt = new Date(hour.item.dt * 1000);
  return (
    <HourContainer>
      <HorizontalLine />
      {hour.index === 0 ? (
        <HourTimeNow> Now </HourTimeNow>
      ) : (
        <HourTime>{dt.toLocaleTimeString().replace(/:\d+ /, ' ')}</HourTime>
      )}
      {hour.index === 0 ? <BigOval /> : <SmallOval />}
      {hour.index === 0 ? (
        <HourTemperatureNow>{Math.round(hour.item.temp)}°</HourTemperatureNow>
      ) : (
        <HourTemperature>{Math.round(hour.item.temp)}°</HourTemperature>
      )}
    </HourContainer>
  );
};

export const BigOval = styled.View`
  height: 25px;
  width: 25px;
  background-color: #ffffff;
  border-radius: 12px;
`;

export const SmallOval = styled.View`
  height: 20px;
  width: 20px;
  background-color: #ffffff;
  border-radius: 10px;
`;

export const HorizontalLine = styled.View`
  border-bottom-color: white;
  border-bottom-width: 3px;
  width: 180%;
  top: 50%;
  left: 60%;
`;

export const HourTimeNow = styled.Text`
  height: 30px;
  width: 41px;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 27px;
  text-align: center;
`;
export const HourTime = styled.Text`
  height: 17px;
  width: 70px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 18px;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 10px;
`;

export const HourTemperatureNow = styled.Text`
  height: 35px;
  width: 40px;
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 38px;
  text-align: right;
`;

export const HourTemperature = styled.Text`
  height: 28px;
  width: 32px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 30px;
  text-align: right;
`;

export const HourContainer = styled.View`
  padding-right: 10px;
  padding-left: 10px;
  align-items: center;
`;

export default HourItem;
