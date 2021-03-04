/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import ProductDescription from './ProductDescription'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      filterItems: [],
      category: ''
    }
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  changeCategory = async e => {
    let value = e.target.value === 'All Products' ? '' : e.target.value
    await this.setState({...this.state, category: value})
    this.filterChange()
  }
  handleInputChange = async e => {
    await this.setState({
      ...this.state,
      input: e.target.value
    })
    this.filterChange()
  }
  filterChange = () => {
    let filterData = []
    if (this.category === '') {
      filterData = this.props.products.filter(info => {
        let name = info.name.toLowerCase()
        let input = this.state.input.toLowerCase()
        return name.includes(input)
      })
    } else {
      filterData = this.props.products.filter(info => {
        let name = info.name.toLowerCase()
        let input = this.state.input.toLowerCase()
        return name.includes(input) && info.category === this.state.category
      })
    }
    this.setState({...this.state, filterItems: filterData})
  }
  render() {
    const {input, filterItems} = this.state
    const {products} = this.props
    const categories = ['All Products']
    products.forEach(product => {
      if (!categories.includes(product.category))
        categories.push(product.category)
    })
    return (
      <div id="products-page-container">
        <form>
          <input
            value={this.state.input}
            onChange={this.handleInputChange}
            placeholder="Search items..."
          />
          <br />
          {categories.map((category, i) => {
            return (
              <button
                key={i}
                type="button"
                value={category}
                onClick={this.changeCategory}
              >
                {category}
              </button>
            )
          })}
        </form>
        <div id="all-products-container">
          {input === '' ? (
            products && <ProductDescription products={products} />
          ) : (
            <ProductDescription products={filterItems} />
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
