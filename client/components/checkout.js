import React from 'react'
import {connect} from 'react-redux'
import fetchCheckout from '../store/checkout'
import CheckoutItem from './checkout-item'

function mapState(state) {
  return {
    products: state.checkout.products
  }
}

function mapDispatch(dispatch) {
  return {
    fetchCheckout: () => dispatch(fetchCheckout())
  }
}

class Checkout extends React.Component {
  componmentDidMount() {
    this.props.fetchCheckout()
  }
  render() {
    return (
      <div>
        {this.props.products.map((item, index) => {
          return <CheckoutItem key={index} />
        })}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Checkout)
