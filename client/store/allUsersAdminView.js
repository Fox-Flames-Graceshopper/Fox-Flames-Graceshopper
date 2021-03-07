import axios from 'axios'
//action type
const GETALLUSERS = 'GETALLUSERS'
const DELETE_USER = 'DELETE_USER'
//action creator
export function getAllUsers(user) {
  return {
    type: GETALLUSERS,
    user
  }
}

const deleteUser = user => {
  return {
    type: DELETE_USER,
    user
  }
}
//thunk
export function fetchUserThunk() {
  return async dispatch => {
    try {
      let {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteUserThunk = userId => async dispatch => {
  try {
    const response = await axios.delete(`/api/users/${userId}`)
    const data = response.data
    const action = deleteUser(data)
    dispatch(action)
    // history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GETALLUSERS:
      return action.user
    case DELETE_USER:
      return state.filter(currentUser => currentUser.id !== action.user.id)
    default:
      return state
  }
}
