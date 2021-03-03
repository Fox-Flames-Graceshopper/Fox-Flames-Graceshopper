const axios = require('axios')

const GET_PRODUCTS = 'GET_PRODUCTS'

// action creator
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

// get all products thunk
export const fetchProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const data = response.data
    dispatch(getProducts(data))
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
