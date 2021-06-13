
// Action Types

export const ADD_CITY = 'ADD_CITY'
export const DELETE_CITY = 'DELETE_CITY'

// Action Creators


export function addCity(city) {
  return {
    type: ADD_CITY,
    payload: city
  }
}

export function deleteCity(city) {
  return {
    type: DELETE_CITY,
    payload: city
  }
}

// reducer

const initialState = []

function citiesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CITY:
      return [
        ...state,
          action.payload
      ]

    case DELETE_CITY:
      const deletedNewArray = remove(state, obj => {
        return obj != action.payload
      })
      return deletedNewArray

    default:
      return state
  }
}

export default citiesReducer
