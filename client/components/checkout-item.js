import React from 'react'
import {connect} from 'react-redux'
import {deleteSingleItem} from '../store/checkout'

function roundDecimals(input) {
  let val = parseFloat(input).toFixed(2)
  return parseFloat(val)
}

class CheckoutItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: 1
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: parseInt(event.target.value)
    })

    this.props.setPrice(this.props.price * this.state.quantity)
  }

  handleIncrement(event) {
    let prevState = parseInt(this.state.quantity)
    this.setState({
      quantity: prevState + 1
    })
    this.props.increaseTotal(this.props.price)

    if (this.props.isLoggedIn) {
      this.props.updateQuantity(this.props.item.id, this.state.quantity + 1)
    } else {
      this.props.updateOffline(this.props.id, this.state.quantity + 1)
    }
  }

  handleDecrement(event) {
    let prevState = parseInt(this.state.quantity)
    if (prevState > 1) {
      this.setState({
        quantity: prevState - 1
      })
      this.props.decreasePrice(this.props.price)

      if (this.props.isLoggedIn) {
        this.props.updateQuantity(this.props.item.id, this.state.quantity - 1)
      } else {
        this.props.updateOffline(this.props.id, this.state.quantity - 1)
      }
    }
    // this.props.getTotal();
  }

  componentDidMount() {
    //check if logged in or not
    if (this.props.isLoggedIn) {
      this.setState({quantity: this.props.item.Cart_Items.quantity})
    } else {
      this.setState({quantity: parseInt(this.props.quantity)})
    }
  }
  deleteItem = e => {
    e.preventDefault()

    if (this.props.isLoggedIn && this.props.user.id) {
      const productId = this.props.item.id
      const userId = this.props.user.id
      this.props.triggerRender(productId)
      this.props.deleteSingleItem(userId, productId)
    } else {
      const productId = this.props.id
      this.props.triggerRender(productId)
    }
  }
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className="chk-item-cont">
          <div className="item-img-cont">
            <img className="cart-img" src={this.props.item.imageUrl} />
          </div>

          <div className="item-cart-info">
            <h2 className="item-cart-name">{this.props.item.name}</h2>
            <span id="item-cart-price">
              ${roundDecimals(this.props.item.price * this.state.quantity)}
            </span>
            <div>
              <div>
                <button
                  className="dec-button"
                  onClick={this.handleDecrement}
                  type="button"
                >
                  -
                </button>
                <input
                  id="qty-cart-input"
                  value={this.state.quantity}
                  name="quantity"
                  type="number"
                  min="1"
                  onChange={this.handleChange}
                />
                <button
                  className="inc-button"
                  onClick={this.handleIncrement}
                  type="button"
                >
                  +
                </button>
              </div>

              <button
                type="submit"
                onClick={this.deleteItem}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="chk-item-cont">
          <div className="item-img-cont">
            <img className="cart-img" src={this.props.imageUrl} />
          </div>

          <div className="item-cart-info">
            <h2 className="item-cart-name">{this.props.name}</h2>
            <span id="item-cart-price">
              ${roundDecimals(this.props.price * this.state.quantity)}
            </span>
            <div>
              <div>
                <button
                  className="dec-button"
                  onClick={this.handleDecrement}
                  type="button"
                >
                  -
                </button>
                <input
                  id="qty-cart-input"
                  value={this.state.quantity}
                  name="quantity"
                  type="number"
                  min="1"
                  onChange={this.handleChange}
                />
                <button
                  className="inc-button"
                  onClick={this.handleIncrement}
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="delete-btn"
                onClick={this.deleteItem}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    deleteSingleItem: (userId, productId) =>
      dispatch(deleteSingleItem(userId, productId))
  }
}

export default connect(mapState, mapDispatch)(CheckoutItem)
