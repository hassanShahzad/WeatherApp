import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

const CityCard = ({data}) => {
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [backgroundColor, setBackgroundColor] = useState();
  const [icon, setIcon] = useState();
  const colors = [
    '#3c95de',
    '#0c7ad5',
    '#020208',
    '#323238',
    '#27273c',
    '#232374',
  ];

  useEffect(() => {
    setData();
  });

  const setData = () => {
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
    setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    const onlyTime = presentDate.toLocaleTimeString();
    setCurrentTime(onlyTime);
    const color = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(color);
  };

  return (
    <Container backgroundColor={backgroundColor}>
      <PlaceDateContainer>
        <CityText>{data.name}</CityText>
        <DateText>{currentDate}</DateText>
        <TimeText>{currentTime}</TimeText>
      </PlaceDateContainer>
      <TemperatureIcon source={{uri: icon}} />
      <TemperatureText>{Math.round(data.main.temp)}°</TemperatureText>
    </Container>
  );
};

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 20px;
  border-radius: 30px;
  width: 90%;
  height: 140px;
  ${props => props.backgroundColor}
`;
export const PlaceDateContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  color: #000000;
  margin-left: 20px;
`;

export const TemperatureText = styled.Text`
  color: white;
  font-size: 50px;
  font-family: Poppins;
  font-weight: bold;
  margin-right: 10px;
`;
export const CityText = styled.Text`
  color: white;
  font-size: 26px;
  font-family: Poppins;
  font-weight: bold;
`;
export const DateText = styled.Text`
  height: 36px;
  width: 84px;
  color: #ffffff;
  font-family: Poppins;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 18px;
`;
export const TimeText = styled.Text`
  color: white;
  font-size: 12px;
  font-family: Poppins;
`;
const TemperatureIcon = styled.Image`
  width: 84px;
  height: 84px;
  margin: 0 auto;
`;

export default CityCard;
