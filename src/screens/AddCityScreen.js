import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {IconButton, TextInput, FAB} from 'react-native-paper';
import Header from '../components/Header';
import {useDispatch} from 'react-redux';

function AddCityScreen({navigation}) {
  const [cityName, setCityName] = useState('');
  const API_KEY = '799acd13e10b7a3b7cf9c0a8da6e5394';
  const dispatch = useDispatch();
  const citiesReducer = city => dispatch({type: 'ADD_CITY', payload: city});

  let cityData;

  const onSaveCity = () => {
    getWeatherOfCity(cityName);
    navigation.goBack();
  };
  const getWeatherOfCity = async city => {
    try {
      const result = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      );

      if (result.status === 200) {
        const data = await result.json();
        cityData = data;
        citiesReducer(data);
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
  return (
    <>
      <Header navigation={navigation} titleText="Add a new city" />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <View style={styles.container}>
        <TextInput
          label="Add City Here"
          value={cityName}
          mode="outlined"
          onChangeText={setCityName}
          style={styles.title}
        />
        <FAB
          style={styles.fab}
          small
          icon="check"
          disabled={cityName == '' ? true : false}
          onPress={() => onSaveCity()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 40,
    margin: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    top: 150,
  },
});

export default AddCityScreen;
