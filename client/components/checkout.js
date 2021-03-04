import React from 'react'
import {connect} from 'react-redux'

import {fetchLoggedInCart} from '../store/checkout'
import CheckoutItem from './checkout-item'
import Subtotal from './Subtotal'

function mapState(state) {
  return {
    products: state.checkout,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

function mapDispatch(dispatch) {
  return {
    // checkoutItems: () => dispatch(fetchCheckout()),
    fetchLoggedInCart: cartId => dispatch(fetchLoggedInCart(cartId))
  }
}

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [
        {
          id: 1,
          name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
          price: 109.95,
          description:
            'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
          category: 'men clothing',
          imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          createdAt: '2021-03-04T15:47:00.902Z',
          updatedAt: '2021-03-04T15:47:00.902Z'
        }
      ]
    }

    this.getTotal = this.getTotal.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      let userId = this.props.userId
      let isLoggedIn = this.props.isLoggedIn

      if (isLoggedIn) {
        this.props.fetchLoggedInCart(userId)
      }
    }, 75)
  }

  getTotal() {
    let total = 0
    let subtotalObj = {
      total: 0,
      qtyItem: 0
    }
    if (this.props.isLoggedIn) {
      this.props.products.forEach((item, index) => {
        subtotalObj.total += item.price
        subtotalObj.qtyItem = index + 1
      })
    } else {
      this.state.items.forEach((item, index) => {
        subtotalObj.total += item.price
        subtotalObj.qtyItem = index + 1
      })
    }
    return subtotalObj
  }
  //here is where i will check if the user is logged in
  // whether to check state or local storage
  render() {
    if (this.props.isLoggedIn && this.props.products) {
      return (
        <div>
          {this.props.products.map((item, index) => {
            return <CheckoutItem key={index} {...item} />
          })}
          <Subtotal getTotal={this.getTotal} />
        </div>
      )
    } else if (this.props.isLoggedIn === false) {
      return (
        <div>
          {this.state.items.map((item, index) => {
            return <CheckoutItem key={index} {...item} />
          })}
          <Subtotal getTotal={this.getTotal} />
        </div>
      )
    } else {
      return <div>Loading....</div>
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
