import React, { useState, useEffect, useRef } from "react"
import EventProducts from "./EventProducts"
import PaymentForm from "./PaymentForm"
import Grid from "@material-ui/core/Grid"
import { Link } from "react-router-dom"

const EventDetail = props => {
  const { customerId, customer } = props
  const payment = useRef()
  const [order, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [payments, setPayments] = useState([])
  const [confirmation, setConfirmation] = useState(false)

  const getConfirmation = () => {
    if (order.payment !== null) {
      setConfirmation(true)
    } else {
      setConfirmation(false)
    }
  }

  const total = () => {
    let total = 0
    products.forEach(product => (total += +product.product.price))
    return total
  }

  const getOrders = eventId => {
    fetch(`http://localhost:8000/order/${eventId}`, {
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
    fetch(`http://localhost:8000/orderproduct?order_id=${eventId}`, {
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
    fetch(`http://localhost:8000/payment?customer_id=${customerId}`, {
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
    fetch(`http://localhost:8000/order/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    }).then(() => props.history.push(`/customer/${props.customerId}`))
  }
  const removeProduct = opId => {
    fetch(`http://localhost:8000/orderproduct/${opId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kter_token")}`
      }
    }).then(() => getProducts(order.id))
  }

  const handleConfirm = orderId => {
    if (payment.current.value === "0") {
      window.alert("Please select a payment")
    } else if (total() === 0) {
      window.alert("Must have at lease one product to checkout")
    } else {
      fetch(`http://localhost:8000/order/${orderId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("kter_token")}`
        },
        body: JSON.stringify({ payment_id: +payment.current.value })
      }).then(() => {
        payment.current.value = "0"
        getOrders(order.id)
        getConfirmation()
      })
    }
  }

  useEffect(() => {
    getOrders(props.eventId)
    getProducts(props.eventId)
    getPayments(props.customerId)
  }, [props.eventId, props.customerId])

  return (
    <Grid container>
      <Grid>
        <h3>Available Food</h3>
        <EventProducts
          orderId={order.id}
          getProducts={getProducts}
          products={props.products}
        />
      </Grid>
      <Grid>
        <h3>
          {customer.map(c => (
            <Link key={c.id} to={`/customer/${c.id}`}>
              {order.location} - {c.name}
            </Link>
          ))}
        </h3>
        <button
          onClick={() => {
            if (window.confirm("Are you sure?")) {
              deleteItem(order.id)
            }
          }}
        >
          Delete Order
        </button>
        {products.map(product => {
          return (
            <div key={product.id}>
              {product.product.name} {product.product.price}
              <button onClick={() => removeProduct(product.id)}>-</button>
            </div>
          )
        })}

        <h1>Total Price: ${total()}</h1>

        {payments.length ? (
          <>
            <h3>Select Payment</h3>
            <select ref={payment} name="payment" required defaultValue="0">
              <option value="0">Select Payment</option>
              {payments.map(payment => {
                return (
                  <option key={payment.id} value={payment.id}>
                    {payment.merchant_name}
                  </option>
                )
              })}
            </select>
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
          <p>Order Confirmed!</p>
        ) : (
          <>
            {payments.length > 0 ? (
              <>
                <button
                  onClick={() => {
                    handleConfirm(order.id, payment)
                  }}
                >
                  Confirm Order
                </button>
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
