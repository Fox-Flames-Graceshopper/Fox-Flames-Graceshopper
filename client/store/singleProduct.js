import axios from 'axios'

//Action Type
const GET_SINGLE_PROD = 'GET_SINGLE_PROD'

//Action Creator
export const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PROD,
    product
  }
}

//Thunk

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(getSingleProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

//Reducer
const initialState = {}

export default function singleProduct(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PROD:
      return action.product
    default:
      return state
  }
}
