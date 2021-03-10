import React from 'react'
import {connect} from 'react-redux'

import {
  fetchLoggedInCart,
  updateCheckout,
  mergeCart as mergeLocal,
  resetState
} from '../store/checkout'
import CheckoutItem from './checkout-item'
import Subtotal from './Subtotal'
import {fetchCheckout} from '../store/checkout'

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
    updateCheckout: (cartId, data) => dispatch(updateCheckout(cartId, data)),
    fetchCheckout: userId => dispatch(fetchCheckout(userId)),
    resetState: () => dispatch(resetState())
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
      offlineItems: [],
      orderTotal: 0
    }

    this.getTotal = this.getTotal.bind(this)
    this.decreaseTotal = this.decreaseTotal.bind(this)
    this.increaseTotal = this.increaseTotal.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    this.submitState = this.submitState.bind(this)
    this.updateOfflineQuantity = this.updateOfflineQuantity.bind(this)
    this.setPriceInput = this.setPriceInput.bind(this)
    this.triggerRender = this.triggerRender.bind(this)
    // this.updateQuantity = this.updateQuantity.bind(this)
    // this.updateTotal = this.updateTotal.bind(this)
  }
  // componentDidUpdate(prevProps) {
  //   if (this.props.products.length !== prevProps.products.length) {
  //     this.props.fetchLoggedInCart(this.props.userId)
  //   }
  // }
  componentDidMount() {
    setTimeout(async () => {
      let userId = this.props.userId
      let isLoggedIn = this.props.isLoggedIn
      let length = 0
      if (JSON.parse(window.localStorage.getItem('cart'))) {
        length = JSON.parse(window.localStorage.getItem('cart')).length
      }

      if (isLoggedIn) {
        // heres will i merge carts when logged in
        await this.props.fetchLoggedInCart(userId)
      } else if (length > 0 && !isLoggedIn) {
        this.setState({
          items: JSON.parse(window.localStorage.getItem('cart'))
        })
        this.setState({
          offlineItems: JSON.parse(window.localStorage.getItem('cart'))
        })
      }

      this.getTotal()
    }, 75)

    setTimeout(() => {
      this.setState({loggedItems: this.props.products})
    }, 200)
  }

  // mergeState(state) {
  //   this.props.updateCheckout(1, state)
  // }

  submitState(event) {
    event.preventDefault()
    if (this.props.isLoggedIn) {
      this.props.updateCheckout(this.props.userId, this.state.loggedItems)
    } else {
      window.localStorage.clear()
      window.localStorage.setItem(
        'cart',
        JSON.stringify(this.state.offlineItems)
      )
    }
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

  updateOfflineQuantity(itemID, qty) {
    const offlineItems = this.state.offlineItems
    for (let i = 0; i < offlineItems.length; i++) {
      if (itemID === offlineItems[i].id) {
        offlineItems[i].quantity = qty
        this.setState({
          offlineItems: offlineItems
        })
      }
    }
  }

  roundDecimals(input) {
    let val = parseFloat(input).toFixed(2)
    return parseFloat(val)
  }

  // componentWillUpdate(prevProps) {
  //   if (this.state.offlineItems.length !== prevProps.offlineItems.length) {
  //     console.log('wooooo hoooooo')
  //   }
  // }

  triggerRender(productID) {
    if (this.props.isLoggedIn) {
      let index = -1
      let found = false
      console.log('this is the product id  ', productID)
      for (let i = 0; i < this.state.loggedItems.length; i++) {
        if (productID === this.state.loggedItems[i].id) {
          index = i
          found = true
        }
      }
      let loggedItems = this.state.loggedItems

      if (found) {
        if (index > -1) {
          loggedItems.splice(index, 1)
        }

        this.setState({loggedItems: loggedItems})
        this.props.fetchLoggedInCart(this.props.userId)
      }
    } else {
      let index = -1
      let found = false
      let localArray = JSON.parse(window.localStorage.getItem('cart'))

      for (let i = 0; i < localArray.length; i++) {
        if (productID === localArray[i].id) {
          index = i
          window.localStorage.clear()
          localArray.splice(index, 1)
          window.localStorage.setItem('cart', JSON.stringify(localArray))
        }
      }

      this.setState({offlineItems: localArray})
    }
  }

  getTotal() {
    let subtotalObj = {
      total: 0,
      qtyItem: 0
    }
    if (this.props.isLoggedIn) {
      this.state.loggedItems.forEach((item, index) => {
        subtotalObj.total += this.roundDecimals(
          item.price * item.Cart_Items.quantity
        )
        subtotalObj.qtyItem = index + 1
      })
    } else {
      this.state.items.forEach((item, index) => {
        let total = this.state.subtotal.total
        let price = item.price * item.quantity

        let sum = parseFloat(total) + price

        this.setState({
          subtotal: {
            total: this.roundDecimals(sum),
            qtyItem: index + 1
          }
        })
      })
    }
    return subtotalObj
  }

  decreaseTotal(price) {
    let total = this.roundDecimals(this.state.subtotal.total)

    this.setState({
      subtotal: {
        total: this.roundDecimals(total - price)
      }
    })
  }

  increaseTotal(price) {
    let total = parseFloat(this.state.subtotal.total)
    let quantity = this.state.subtotal.qtyItem

    this.setState({
      subtotal: {
        total: this.roundDecimals(total + price),
        qtyItem: quantity
      }
    })
  }

  setPriceInput(price) {
    let total = parseFloat(this.state.subtotal.total)

    this.setState({
      subtotal: {
        total: this.roundDecimals(total + price)
      }
    })
  }

  //here is where i will check if the user is logged in
  // whether to check state or local storage
  render() {
    if (this.props.isLoggedIn && this.state.loggedItems) {
      return (
        <div>
          <button type="submit" onClick={this.submitState}>
            Update Cart
          </button>
          {this.state.loggedItems.map((item, index) => {
            return (
              <CheckoutItem
                key={index}
                getTotal={this.getTotal}
                decreasePrice={this.decreaseTotal}
                increaseTotal={this.increaseTotal}
                updateQuantity={this.updateQuantity}
                isLoggedIn={this.props.isLoggedIn}
                item={item}
                triggerRender={this.triggerRender}
              />
            )
          })}
          <Subtotal
            getTotal={this.getTotal}
            isLoggedIn={this.props.isLoggedIn}
            subtotal={this.state.subtotal}
          />
          <div className="order-button">
            <button type="submit">Order Now</button>
          </div>
        </div>
      )
    } else if (this.props.isLoggedIn === false) {
      return (
        <div>
          <button type="submit" onClick={this.submitState}>
            Update Cart
          </button>
          {this.state.offlineItems.map((item, index) => {
            return (
              <CheckoutItem
                item={item}
                key={index}
                getTotal={this.getTotal}
                decreasePrice={this.decreaseTotal}
                increaseTotal={this.increaseTotal}
                isLoggedIn={this.props.isLoggedIn}
                updateOffline={this.updateOfflineQuantity}
                setPrice={this.setPriceInput}
                triggerRender={this.triggerRender}
                {...item}
              />
            )
          })}
          <Subtotal subtotal={this.state.subtotal} />
          <div className="order-button">
            <button type="submit">Order Now</button>
          </div>
        </div>
      )
    } else {
      return <div>Loading....</div>
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
