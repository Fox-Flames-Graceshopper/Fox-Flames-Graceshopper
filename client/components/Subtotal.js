import React from 'react'

function Subtotal(props) {
  let subtotal = {}
  if (props.isLoggedIn) {
    subtotal = props.getTotal()
  } else {
    subtotal = props.subtotal
  }

  console.log('this is the total: ', subtotal)
  return (
    <div className="total-cont">
      <h3>Your Total</h3>
      <div>
        <div className="total-qty">
          <span>Items ({subtotal.qtyItem}):</span>
          <span>${subtotal.total}</span>
        </div>
        <div className="total-qty">
          <span>Shipping and Handling:</span>
          <span>$22.33</span>
        </div>
        <div className="total-qty">
          <span>Total Before Tax:</span>
          <span>${subtotal.total + 22.33}</span>
        </div>
        <div className="total-qty">
          <span>Estimated Tax:</span>
          <span>$73.02</span>
        </div>
        <div className="total-qty">
          <span>Order Total:</span>
          <span>$546.04</span>
        </div>
      </div>
    </div>
  )
}

export default Subtotal
