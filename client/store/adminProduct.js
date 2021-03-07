import axios from 'axios'

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
