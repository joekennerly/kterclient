import React from "react"
import { Link } from "react-router-dom"

const Product = props => <Link to={`/product/${props.product.id}`}>{props.product.name}</Link>


export default Product
