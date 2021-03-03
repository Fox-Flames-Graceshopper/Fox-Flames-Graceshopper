import React from 'react'
import {connect} from 'react-redux'
import {fetchCheckout} from '../store/checkout'
import CheckoutItem from './checkout-item'
import Subtotal from './Subtotal'

function mapState(state) {
  return {
    products: state.checkout
  }
}

function mapDispatch(dispatch) {
  return {
    checkoutItems: () => dispatch(fetchCheckout())
  }
}

class Checkout extends React.Component {
  componentDidMount() {
    this.props.checkoutItems()
  }
  render() {
    if (this.props.products) {
      return (
        <div>
          {this.props.products.map((item, index) => {
            if (index < 5) {
              return <CheckoutItem key={index} {...item} />
            }
          })}
          <Subtotal />
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
