import React from 'react'

function Subtotal() {
  return (
    <div className="total-cont">
      <h3>Your Total</h3>
      <div>
        <div className="total-qty">
          <span>Items(quantity):</span>
          <span>$450.69</span>
        </div>
        <div className="total-qty">
          <span>Shipping and Handling:</span>
          <span>$22.33</span>
        </div>
        <div className="total-qty">
          <span>Total Before Tax:</span>
          <span>$473.02</span>
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
