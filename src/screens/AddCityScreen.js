import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, TextInput, FAB} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Header from '../components/Header';
import {getWeatherOfCity} from '../shared/NetworkService';

function AddCityScreen({navigation}) {
  const [cityName, setCityName] = useState('');
  const dispatch = useDispatch();
  const citiesReducer = city => dispatch({type: 'ADD_CITY', payload: city});
  const onSaveCity = () => {
    getWeatherOfCity(cityName).then(data => {
      citiesReducer(data);
      navigation.goBack();
    });
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
