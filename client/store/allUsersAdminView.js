import axios from 'axios'
//action type
const GETALLUSERS = 'GETALLUSERS'
//action creator
export function getAllUsers(user) {
  return {
    type: GETALLUSERS,
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

export default (state = [], action) => {
  switch (action.type) {
    case GETALLUSERS:
      return action.user
    default:
      return state
  }
}
