import React from 'react'

class CheckoutItem extends React.Component {
  constructor() {
    super()

    this.state = {
      quantity: 1
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleIncrement(event) {
    let prevState = parseInt(this.state.quantity)
    this.setState({
      quantity: prevState + 1
    })
  }

  handleDecrement(event) {
    let prevState = parseInt(this.state.quantity)
    if (prevState > 1) {
      this.setState({
        quantity: prevState - 1
      })
    }
  }

  render() {
    return (
      <div className="chk-item-cont">
        <div className="item-img-cont">
          <img className="cart-img" src={this.props.imageUrl} />
        </div>

        <div className="item-cart-info">
          <h2 className="item-cart-name">{this.props.name}</h2>
          <span id="item-cart-price">${this.props.price}</span>
          <div>
            <div>
              <button onClick={this.handleDecrement} type="button">
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
              <button onClick={this.handleIncrement} type="button">
                +
              </button>
            </div>
            <button type="submit">Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutItem
