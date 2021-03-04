import React from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'

export default props => {
  const {products} = props
  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return products.map(product => {
    return (
      <div key={product.id} className="product-description">
        <p>{product.name}</p>
        <img src={product.imageUrl} />
        <p>Category: {product.category}</p>
        <form>
          <label>Quantity</label>
          <select>
            {numArr.map(val => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <Popup
            trigger={
              <button type="button" className="button">
                {' '}
                Preview{' '}
              </button>
            }
            modal
          >
            {close => (
              <div id="modal">
                <h6>{product.name}</h6>
                <img src={product.imageUrl} />
                <p>{product.price}</p>
                <p>{product.description}</p>
                <button id="close" type="button" onClick={close}>
                  &times;
                </button>
                <Link to={`/products/${product.id}`}>
                  <button type="button">Product Details</button>
                </Link>
              </div>
            )}
          </Popup>
          <Link to={`/products/${product.id}`}>
            <button type="button">Product Details</button>
          </Link>
          <button type="submit">Add to cart</button>
        </form>
      </div>
    )
  })
}
