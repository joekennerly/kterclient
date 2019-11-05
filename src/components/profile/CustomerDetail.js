import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PaymentForm from "./PaymentForm"
import EventList from "./EventList"
import EventForm from "./EventForm"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { green } from "@material-ui/core/colors"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: green[500]
    }
}))

const CustomerDetail = props => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }
    const [customer, setCustomer] = useState([])
    const [payments, setPayments] = useState([])
    const [orders, setOrders] = useState([])

    const getCustomer = customerId => {
        fetch(`http://localhost:8000/customer/${customerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(customer => {
                setCustomer(customer)
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

    const getOrders = customerId => {
        fetch(`http://localhost:8000/order?customer_id=${customerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        })
            .then(response => response.json())
            .then(orders => {
                setOrders(orders)
            })
    }

    const deleteItem = id => {
        fetch(`http://localhost:8000/customer/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("kter_token")}`
            }
        }).then(() => props.history.push("/profile"))
    }

    useEffect(() => {
        getCustomer(props.customerId)
        getPayments(props.customerId)
        getOrders(props.customerId)
    }, [props.customerId])

    return (
        <>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            :)
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={customer.name}
                    subheader={customer.phone}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering,
                            add saffron and set aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a
                            large, deep skillet over medium-high heat. Add
                            chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes.
                            Transfer shrimp to a large plate and set aside,
                            leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt
                            and pepper, and cook, stirring often until thickened
                            and fragrant, about 10 minutes. Add saffron broth
                            and remaining 4 1/2 cups chicken broth; bring to a
                            boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top
                            with artichokes and peppers, and cook without
                            stirring, until most of the liquid is absorbed, 15
                            to 18 minutes. Reduce heat to medium-low, add
                            reserved shrimp and mussels, tucking them down into
                            the rice, and cook again without stirring, until
                            mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10
                            minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <button
                onClick={() => {
                    if (window.confirm("Are you sure?")) {
                        deleteItem(customer.id)
                    }
                }}
            >
                Delete
            </button>
            <button
                onClick={() => {
                    props.history.push(`/customer/${customer.id}/edit`)
                }}
            >
                Edit
            </button>
            <p>Payment Types</p>
            {payments.map(payment => (
                <div key={payment.id}>
                    <Link to={`/payment/${payment.id}`}>
                        {payment.merchant_name}
                    </Link>
                </div>
            ))}
            <PaymentForm
                getPayments={() => getPayments(customer.id)}
                customerId={customer.id}
            />
            <p>Customer's Orders</p>
            <EventList orders={orders} customer={customer} />
            <EventForm
                customerId={customer.id}
                getOrders={() => getOrders(customer.id)}
            />
        </>
    )
}
export default CustomerDetail
