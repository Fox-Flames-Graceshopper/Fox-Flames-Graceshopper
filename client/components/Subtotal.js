import React from 'react'

function Subtotal(props) {
  let subtotal = {}
  if (props.isLoggedIn) {
    subtotal = props.getTotal()
  } else {
    subtotal = props.subtotal
    subtotal.total = parseFloat(subtotal.total)
  }

  const taxRate = 0.085
  const tax = 1 + taxRate
  let overallTotal = 0
  let estimatedTax = 0
  let shipping = 22.33
  let beforeTax = 0
  if (subtotal.total > 0) {
    overallTotal = roundDecimals(subtotal.total + 22.3 + tax)
    estimatedTax = roundDecimals((subtotal.total + shipping) * taxRate)
    beforeTax = roundDecimals(subtotal.total + shipping)
  } else {
    shipping = 0
  }

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
          <span>${shipping}</span>
        </div>
        <div className="total-qty">
          <span>Total Before Tax:</span>
          <span>${beforeTax}</span>
        </div>
        <div className="total-qty">
          <span>Estimated Tax:</span>
          <span>${estimatedTax}</span>
        </div>
        <div className="total-qty">
          <span>Order Total:</span>
          <span>${overallTotal}</span>
        </div>
      </div>
    </div>
  )
}

function roundDecimals(input) {
  let val = parseFloat(input).toFixed(2)
  return parseFloat(val)
}

export default Subtotal
