import React from 'react';
import styled from 'styled-components/native';

const AddCityButton = () => {
  return (
    <Container>
      <AddCityIcon source={require('../../assets/icons/Plus.png')} />
      <AddCityText>Aggiungi città</AddCityText>
    </Container>
  );
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const AddCityText = styled.Text`
  height: 28px;
  width: 144px;
  color: #01175f;

  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 30px;
  text-align: center;
  margin-bottom: 25px;
  margin-top: 25px;
`;
const AddCityIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin: 0 auto;
`;
export default AddCityButton;
