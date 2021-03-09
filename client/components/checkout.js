import React from 'react'
import {connect} from 'react-redux'

import {fetchLoggedInCart, updateCheckout} from '../store/checkout'
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
    fetchLoggedInCart: cartId => dispatch(fetchLoggedInCart(cartId)),
    updateCheckout: (cartId, data) => dispatch(updateCheckout(cartId, data))
  }
}

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [],
      subtotal: {total: 0, qtyItem: 0},
      cartId: 0,
      loggedItems: [],
      offlineItems: []
    }

    this.getTotal = this.getTotal.bind(this)
    this.decreaseTotal = this.decreaseTotal.bind(this)
    this.increaseTotal = this.increaseTotal.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    this.submitState = this.submitState.bind(this)
  }

  componentDidMount() {
    setTimeout(async () => {
      let userId = this.props.userId
      let isLoggedIn = this.props.isLoggedIn

      // heres will i merge carts when logged in
      if (isLoggedIn) {
        await this.props.fetchLoggedInCart(userId)
      } else if (window.localStorage.getItem('cart')) {
        this.setState({items: JSON.parse(window.localStorage.getItem('cart'))})
        this.setState({
          offlineItems: JSON.parse(window.localStorage.getItem('cart'))
        })
      }

      this.getTotal()
    }, 75)

    setTimeout(() => {
      this.setState({loggedItems: this.props.products})
    }, 500)
  }

  submitState(event) {
    event.preventDefault()
    this.props.updateCheckout(1, this.state.loggedItems)
  }
  updateQuantity(itemID, qty) {
    const loggedItems = this.state.loggedItems
    for (let i = 0; i < loggedItems.length; i++) {
      if (itemID === loggedItems[i].id) {
        loggedItems[i].Cart_Items.quantity = qty
        this.setState({
          loggedItems: loggedItems
        })
      }
    }
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
    console.log('this is the satttttt', this.state.loggedItems)
    if (this.props.isLoggedIn && this.props.products) {
      return (
        <div>
          <button type="submit" onClick={this.submitState}>
            Update Cart
          </button>
          {this.props.products.map((item, index) => {
            return (
              <CheckoutItem
                key={index}
                getTotal={this.getTotal}
                decreasePrice={this.decreaseTotal}
                increaseTotal={this.increaseTotal}
                updateQuantity={this.updateQuantity}
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
