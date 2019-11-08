import React from "react"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"

export default function EventProducts(props) {
  const {products} = props
  const addProduct = (orderId, productId) => {
    fetch("http://localhost:8000/orderproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      },
      body: JSON.stringify({
        order_id: orderId,
        product_id: productId
      })
    }).then(() => props.getProducts(orderId))
  }
  return (
    <>
      {products.map(product => (
        <div key={product.id}>
          {product.name}{" "}
          <Button
            size="small"
            onClick={() => addProduct(props.orderId, product.id)}
          >
            <AddIcon />
          </Button>
        </div>
      ))}
    </>
  )
}
