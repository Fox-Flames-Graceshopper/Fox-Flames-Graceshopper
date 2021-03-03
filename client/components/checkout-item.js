import React from 'react'

class CheckoutItem extends React.Component {
  constructor() {
    super()

    this.state = {
      quantity: 1
    }
  }

  handleChange(event) {}

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
            {/* <div>
              <input type="text" />
            </div> */}
            <button type="submit">Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckoutItem
