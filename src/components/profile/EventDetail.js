import React, { useState, useEffect, useRef } from "react"
import EventProducts from "./EventProducts"
import PaymentForm from "./PaymentForm"

const EventDetail = props => {
  const { customer } = props
  const [order, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [payments, setPayments] = useState([])

  const payment = useRef()

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
    if (!payment.current.value) {
      window.alert("Please select a payment")
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
        getOrders()
      })
    }
  }

  useEffect(() => {
    getOrders(props.eventId)
    getProducts(props.eventId)
    getPayments(props.customerId)
  }, [props.eventId, props.customerId])

  const total = () => {
    let total = 0
    products.forEach(product => (total += +product.product.price))
    return total
  }

  console.log(payments)

  return (
    <>
      <h3>{order.location}</h3>
      {order.payment ? (
        <p>Order Confirmed!</p>
      ) : (
        <>
          {payments.length < 0 ? (
            <button
            onClick={() => {
              handleConfirm(order.id, payment)
            }}
            >
              Confirm Order
            </button>
          ) : (
            <p>Add a payment to confirm</p>
          )}
        </>
      )}
      {products.map(product => {
        return (
          <div key={product.id}>
            {product.product.name} {product.product.price}
            <button onClick={() => removeProduct(product.id)}>-</button>
          </div>
        )
      })}
      <h1>Total Price: ${total()}</h1>

      {payments.length > 0 ? (
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
          <PaymentForm getPayments={getPayments} />
        </>
      )}
      <h3>Add Food To Order</h3>
      <EventProducts
        orderId={order.id}
        getProducts={getProducts}
        products={props.products}
      />
      <button
        onClick={() => {
          if (window.confirm("Are you sure?")) {
            deleteItem(order.id)
          }
        }}
      >
        Delete Order
      </button>
    </>
  )
}
export default EventDetail
