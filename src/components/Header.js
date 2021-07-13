import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Appbar} from 'react-native-paper';
import styled from 'styled-components/native';

function Header({navigation, titleText}) {
  return (
    <Appbar.Header style={styles.headerContainer}>
      <TouchableOpacity
        hitSlop={{top: 20, bottom: 20, left: 150, right: 50}}
        onPress={() => navigation.goBack()}>
        <Image
          style={{height: 15, width: 15}}
          source={require('../../assets/icons/Arrow-Left.png')}
        />
      </TouchableOpacity>
      <Container>
        <Title>{titleText}</Title>
      </Container>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#77b9f5',
  },
});

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 32px;
  color: white;
`;

export default Header;
