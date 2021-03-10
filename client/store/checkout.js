import axios from 'axios'

const GET_CHECKOUT = 'GET_CHECKOUT'
const GET_CART = 'GET_CART'
const RESET_STATE = 'RESET_STATE'
const UPDATE_CART = 'UPDATE_CART'

const initialCheckout = []

export function getCheckout(products) {
  return {
    type: GET_CHECKOUT,
    products
  }
}

export function getCart(items) {
  return {
    type: GET_CART,
    items
  }
}

export function fetchCheckout() {
  return async dispatch => {
    try {
      let {data} = await axios.get('/api/products')
      dispatch(getCheckout(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export function updateCheckout(userId, updateData) {
  return async dispatch => {
    try {
      let {data} = await axios.put(`/api/carts/${userId}`, {
        products: updateData
      })
      dispatch(getCheckout(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export function updateSingleItem(userId, singleItem) {
  return async dispatch => {
    try {
      let {data} = await axios.put(`/api/carts/${userId}`, {
        userId,
        singleItem,
        isSingleItem: true
      })
      dispatch(getCheckout(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export function deleteSingleItem(userId, productId) {
  return async dispatch => {
    try {
      console.log('hello delete thunk')
      let {data} = await axios.put(`/api/carts/${userId}`, {
        userId,
        productId,
        deleteItem: true
      })
      dispatch(getCheckout(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export function reset() {
  return {
    type: RESET_STATE
  }
}

export function resetState() {
  return dispatch => {
    dispatch(reset())
  }
}

// can lead to errors based on how the route is written
// possilby load cart(s) based on where the userId equals the userId of the logged in user
export function fetchLoggedInCart(userId) {
  return async dispatch => {
    try {
      let {data} = await axios.get(`/api/carts/${userId}`)
      dispatch(getCart(data.products))
    } catch (e) {
      console.log(e)
    }
  }
}

export function mergeCart(userId, updateData) {
  return async dispatch => {
    try {
      let {data} = await axios.put(`/api/carts/merge/${userId}`, {
        products: updateData
      })
      dispatch(getCheckout(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export default function(state = initialCheckout, action) {
  switch (action.type) {
    case GET_CHECKOUT:
      return [...state, ...action.products]
    case GET_CART:
      return [...action.items]
    case RESET_STATE:
      return initialCheckout
    default:
      return state
  }
}
