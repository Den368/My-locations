import { handleActions } from 'redux-actions'

const initialState = [{
  Name: 'firstLoc',
  Address: 'Home',
  Coordinates: { longitude: 31.256359, latitude: 34.787538 },
  Category: 'default',
  id: 0
}]

export default handleActions({
  'add location' (state, action) {
    return [{
      id: state.reduce((maxId, location) => Math.max(location.id, maxId), -1) + 1,
      Name: action.payload.Name,
      Address: action.payload.Address,
      Coordinates: action.payload.Coordinates,
      Category: action.payload.Category
    }, ...state]
  },

  'delete location' (state, action) {
    return state.filter(location => location.id !== action.payload.id)
  },

  'edit location' (state, action) {
    return state.map(location => {
      return location.id === action.payload.id ? { ...location,
        Name: action.payload.Name,
        Address: action.payload.Address,
        Coordinates: action.payload.Coordinates,
        Category: action.payload.Category } : location
    })
  }
}, initialState)
