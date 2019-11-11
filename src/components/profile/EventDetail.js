import React, { useState, useEffect } from "react"
import EventProducts from "./EventProducts"
import PaymentForm from "./PaymentForm"
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import moment from "moment"

const EventDetail = props => {
  const { customerId, eventId, customer, prods } = props
  const [order, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [payments, setPayments] = useState([])

  const [payment, setPayment] = useState("")
  const handleChange = event => {
    setPayment(event.target.value)
  }

  const total = () => {
    let total = 0
    products.forEach(product => (total += +product.product.price))
    return total
  }

  const getOrders = eventId => {
    fetch(`https://kterapi.herokuapp.com/order/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    })
      .then(response => response.json())
      .then(event => {
        setOrders(event)
      })
  }

  const getProducts = eventId => {
    fetch(`https://kterapi.herokuapp.com/orderproduct?order_id=${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    })
      .then(response => response.json())
      .then(products => {
        setProducts(products)
      })
  }

  const getPayments = customerId => {
    fetch(`https://kterapi.herokuapp.com/payment?customer_id=${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    })
      .then(response => response.json())
      .then(payments => {
        setPayments(payments)
      })
  }

  const deleteItem = id => {
    fetch(`https://kterapi.herokuapp.com/order/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    }).then(() => props.history.push(`/customer/${props.customerId}`))
  }
  const removeProduct = opId => {
    fetch(`https://kterapi.herokuapp.com/orderproduct/${opId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    }).then(() => getProducts(order.id))
  }

  const handleConfirm = orderId => {
    if (payment === "") {
      window.alert("Please select a payment")
    } else if (total() === 0) {
      window.alert("Must have at lease one product to checkout")
    } else {
      fetch(`https://kterapi.herokuapp.com/order/${orderId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("kter_token")}`
        },
        body: JSON.stringify({ payment_id: +payment })
      }).then(() => {
        setPayment("")
        getOrders(order.id)
      })
    }
  }

  useEffect(() => {
    getOrders(eventId)
    getProducts(eventId)
    getPayments(customerId)
  }, [eventId, customerId])

  return (
    <Grid container>
      <Grid>
        <h3>Available Food</h3>
        <EventProducts
          orderId={order.id}
          getProducts={getProducts}
          products={prods}
        />
      </Grid>
      <Grid>
        <h3>
          {customer.map(c => (
            <Link key={c.id} to={`/customer/${c.id}`}>
              {moment(order.start).add(6, 'hours').format('MMM Do h:mm A')} - {order.location} - {c.name}
            </Link>
          ))}
        </h3>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              deleteItem(order.id)
            }
          }}
        >
          Delete Order
        </Button>
        {products.map(product => {
          return (
            <div key={product.id}>
              {product.product.name} {product.product.price}
              <Button size="small" onClick={() => removeProduct(product.id)}>
                <DeleteIcon />
              </Button>
            </div>
          )
        })}

        <h1>Total Price: ${total()}</h1>

        {payments.length ? (
          <>
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={payment}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Payment Type
                </MenuItem>
                {payments.map(payment => {
                return (
                  <MenuItem key={payment.id} value={payment.id}>
                    {payment.merchant_name}
                  </MenuItem>
                )
              })}
              </Select>
            </FormControl>
          </>
        ) : (
          <>
            <h3>This customer has no payment information</h3>
            <PaymentForm
              getPayments={() => getPayments(customerId)}
              customerId={customerId}
              handleClosePay={() => null}
            />
          </>
        )}

        {order.payment ? (
          <h1 style={{ color: 'springgreen'}}>Order Confirmed!</h1>
        ) : (
          <>
            {payments.length > 0 ? (
              <>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    handleConfirm(order.id, payment)
                  }}
                >
                  Confirm Order
                </Button>
              </>
            ) : (
              <div />
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
}
export default EventDetail
