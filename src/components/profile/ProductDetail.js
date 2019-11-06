import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import ProductEdit from "./ProductEdit"

const ProductDetail = props => {
  const [product, setProducts] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)

  const getProduct = productId => {
    fetch(`http://localhost:8000/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    })
      .then(response => response.json())
      .then(product => {
        setProducts(product)
      })
  }

  const deleteItem = id => {
    fetch(`http://localhost:8000/product/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    }).then(() => props.history.push("/profile"))
  }

  useEffect(() => {
    getProduct(props.productId)
  }, [props.productId])

  return (
    <>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="h6">${product.price}</Typography>
      <Typography>Description: {product.description}</Typography>
      <Button variant="outlined" size="small"
        onClick={() => {
          if (window.confirm("Are you sure?")) {
            deleteItem(product.id)
          }
        }}
      >
        Delete
      </Button>
      <Button variant="outlined" size="small"
        // onClick={() => {
        //   props.history.push(`/product/${product.id}/edit`)
        // }}
        onClick={handleOpenEdit}
      >
        Edit
      </Button>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <ProductEdit product={product} getProduct={() => {getProduct(product.id)}} handleCloseEdit={handleCloseEdit}/>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default ProductDetail
