import axios from 'axios'
import {getSingleProduct} from './singleProduct'

import {getProducts} from './allProducts'
//add,delete,edit
//upadate qaunt of item

const initState = {}
// action type
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
// action creator
const deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}
const editProduct = product => {
  return {
    type: EDIT_PRODUCT,
    product
  }
}
// thunk
export const deleteProductThunk = productId => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/adminproduct/${productId}`)
      const data = response.data
      const action = getProducts(data)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const editProductThunk = (product, productId) => {
  return async dispatch => {
    try {
      const response = await axios.put(
        `/api/adminproduct/${productId}`,
        product
      )
      const updatedProduct = response.data
      const action = getSingleProduct(updatedProduct)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}
//reducer
export default function(state = initState, action) {
  switch (action.type) {
    case DELETE_PRODUCT:
      return state.filter(
        currentProduct => currentProduct.id !== action.product.id
      )
    case EDIT_PRODUCT:
      return action.product
    default:
      return state
  }
}
