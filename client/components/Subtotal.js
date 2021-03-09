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
          <span>${roundDecimals(subtotal.total + 22.33)}</span>
        </div>
        <div className="total-qty">
          <span>Estimated Tax:</span>
          <span>${roundDecimals((subtotal.total + 22.33) * taxRate)}</span>
        </div>
        <div className="total-qty">
          <span>Order Total:</span>
          <span>${roundDecimals((subtotal.total + 22.3) * tax)}</span>
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
