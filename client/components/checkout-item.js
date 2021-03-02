import React from 'react'

function CheckoutItem(props) {
  return (
    <div className="chk-item-cont">
      <div className="item-img-cont">
        <img src={props.imageUrl} />
      </div>

      <div>
        <h2>{props.name}</h2>
        <span>{props.price}</span>
      </div>
    </div>
  )
}

export default CheckoutItem
