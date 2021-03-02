import axios from 'axios'

const GET_CHECKOUT = 'GET_CHECKOUT'

const initialCheckout = []

function getCheckout(products) {
  return {
    type: GET_CHECKOUT,
    products
  }
}

export function fetchCheckout() {
  return async dispatch => {
    try {
      let {data} = await axios.get('/api/placeholder')
      dispatch(getCheckout(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export default function(state = initialCheckout, action) {
  switch (action.type) {
    case GET_CHECKOUT:
      return [...state, action.products]
    default:
      return state
  }
}
