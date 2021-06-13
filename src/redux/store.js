import { createStore } from 'redux'
import citiesReducer from './reducer'

const store = createStore(citiesReducer)

export default store
