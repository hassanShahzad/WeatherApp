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
    console.log('data', data);
    setData();
  });

  const setData = () => {
    const dateAndTimeInSeconds = data.sys.sunrise;
    const presentDate = new Date(dateAndTimeInSeconds * 1000);
    const onlyDate = presentDate.toLocaleDateString();
    setCurrentDate(onlyDate);
    setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    console.log('icon', icon);

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
  margin-left: 10px;
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
  width: 84px;
  height: 84px;
  margin: 0 auto;
`;

export default CityCard;
