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
      items: [],
      subtotal: {total: 0, qtyItem: 0}
    }

    this.getTotal = this.getTotal.bind(this)
    this.decreaseTotal = this.decreaseTotal.bind(this)
    this.increaseTotal = this.increaseTotal.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      let userId = this.props.userId
      let isLoggedIn = this.props.isLoggedIn

      // heres will i merge carts when logged in
      if (isLoggedIn) {
        this.props.fetchLoggedInCart(userId)
      } else if (window.localStorage.getItem('cart')) {
        this.setState({items: JSON.parse(window.localStorage.getItem('cart'))})
      }

      this.getTotal()
    }, 75)
  }

  getTotal() {
    let subtotalObj = {
      total: 0,
      qtyItem: 0
    }
    if (this.props.isLoggedIn) {
      this.props.products.forEach((item, index) => {
        subtotalObj.total += item.price
        subtotalObj.qtyItem = index + 1
      })
      console.log('this is the state logged, ', this.props.products)
    } else {
      this.state.items.forEach((item, index) => {
        let total = this.state.subtotal.total
        let price = item.price * item.quantity
        this.setState({
          subtotal: {
            total: total + price,
            qtyItem: index + 1
          }
        })
      })
    }
    return subtotalObj
  }

  decreaseTotal(price) {
    let total = this.state.subtotal.total

    this.setState({
      subtotal: {
        total: total - price
      }
    })
  }

  increaseTotal(price) {
    let total = this.state.subtotal.total
    let quantity = this.state.subtotal.qtyItem

    this.setState({
      subtotal: {
        total: total + price,
        qtyItem: quantity
      }
    })
  }

  //here is where i will check if the user is logged in
  // whether to check state or local storage
  render() {
    if (this.props.isLoggedIn && this.props.products) {
      return (
        <div>
          {this.props.products.map((item, index) => {
            return (
              <CheckoutItem
                key={index}
                getTotal={this.getTotal}
                decreasePrice={this.decreaseTotal}
                increaseTotal={this.increaseTotal}
                {...item}
              />
            )
          })}
          <Subtotal
            getTotal={this.getTotal}
            isLoggedIn={this.props.isLoggedIn}
            subtotal={this.state.subtotal}
          />
        </div>
      )
    } else if (this.props.isLoggedIn === false) {
      return (
        <div>
          {this.state.items.map((item, index) => {
            return (
              <CheckoutItem
                key={index}
                getTotal={this.getTotal}
                decreasePrice={this.decreaseTotal}
                increaseTotal={this.increaseTotal}
                {...item}
              />
            )
          })}
          <Subtotal subtotal={this.state.subtotal} />
        </div>
      )
    } else {
      return <div>Loading....</div>
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
