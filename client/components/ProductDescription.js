import React from 'react'

export default props => {
  const {products} = props
  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return products.map(product => {
    return (
      <div key={product.id} className="product-description">
        <p>{product.name}</p>
        <img src={product.imageUrl} />
        <p>{product.description}</p>
        <p>{product.category}</p>
        <form>
          <label>Quantity</label>
          <select>
            {numArr.map(val => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <button type="submit">Add to cart</button>
        </form>
      </div>
    )
  })
}
