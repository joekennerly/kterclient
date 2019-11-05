import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary
  }
}))

export default function AllOrders(props) {
  const { confirmed } = props
  const classes = useStyles()
  return (
    <>
      <h3>Upcoming Events</h3>
      <div className={classes.root}>
        <Grid container spacing={1}>
          {confirmed.map(order => {
            return (
              <Grid key={order.id} item xs={12}>
                <Link to={`/order/${order.id}/${order.customer_id}`}>
                  <Paper className={classes.paper}>
                    {order.payment ? (
                      <Typography style={{ color: "springgreen" }}>
                        {order.start.slice(5, 10)} {order.customer.name} {order.location}
                      </Typography>
                    ) : (
                      <Typography style={{ color: "tomato" }}>
                        {order.start.slice(5, 10)} {order.customer.name} {order.location}
                      </Typography>
                    )}
                  </Paper>
                </Link>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </>
  )
}
