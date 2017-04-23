import { handleActions } from 'redux-actions'

const initialState = [{
  Name: 'default',
  id: 0
}]

export default handleActions({
  'add category' (state, action) {
    return [{
      id: state.reduce((maxId, category) => Math.max(category.id, maxId), -1) + 1,
      Name: action.payload.Name
    }, ...state]
  },

  'delete category' (state, action) {
    return state.filter(category => category.Name !== action.payload.Name)
  },

  'edit category' (state, action) {
    return state.map(category => {
      return category.id === action.payload.id ? { ...category, Name: action.payload.Name } : category
    })
  }

}, initialState)